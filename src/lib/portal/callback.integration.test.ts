import { beforeAll, describe, expect, test } from "bun:test";
import { createHmac } from "node:crypto";
import { getPayload, type Payload } from "payload";
import config from "@payload-config";
import { POST } from "@/app/api/portal/ipaymu/callback/route";

let payload: Payload;
let invoiceId: number;
const reference = `test-${crypto.randomUUID()}`;

beforeAll(async () => {
  process.env.IPAYMU_MODE = "sandbox";
  process.env.IPAYMU_VA = "test-va";
  payload = await getPayload({ config });
  const customer = await payload.create({ collection: "customers", data: { name: "Test", email: `${reference}@example.test`, password: "test-password-123", identityConfirmed: true } });
  const order = await payload.create({ collection: "orders", data: { customer: customer.id, title: "Test", category: "mobile", requirements: "Test project requirements", status: "submitted" } });
  const invoice = await payload.create({ collection: "invoices", data: { customer: customer.id, order: order.id, number: reference, amount: 10000, description: "Test", dueDate: new Date().toISOString(), status: "pending" } });
  invoiceId = invoice.id;
  await payload.create({ collection: "payment-attempts", data: { invoice: invoice.id, reference, sessionId: "session-1", status: "pending" } });
});

function callback(amount: string, signatureOverride?: string, status = "1") {
  const data = { amount, reference_id: reference, sid: "session-1", status_code: status, trx_id: "42" };
  const signed = { additional_info: [], amount, reference_id: reference, sid: "session-1", status_code: Number(status), trx_id: 42 };
  const signature = signatureOverride ?? createHmac("sha256", "test-va").update(JSON.stringify(signed)).digest("hex");
  return new Request("https://example.test/api/portal/ipaymu/callback", { method: "POST", headers: { "content-type": "application/x-www-form-urlencoded", "x-signature": signature }, body: new URLSearchParams(data) });
}

describe("payment callbacks", () => {
  test("prevents multiple payment attempts for one invoice", async () => {
    await expect(payload.create({ collection: "payment-attempts", data: { invoice: invoiceId, reference: crypto.randomUUID(), status: "creating" } })).rejects.toThrow();
  });
  test("prevents changing the invoice amount after checkout starts", async () => {
    await expect(payload.update({ collection: "invoices", id: invoiceId, data: { amount: 20000 } })).rejects.toThrow();
  });
  test("rejects forged or mismatched payments without marking invoice paid", async () => {
    expect((await POST(callback("10000", "0".repeat(64)))).status).toBe(400);
    expect((await POST(callback("1"))).status).toBe(400);
    expect((await payload.findByID({ collection: "invoices", id: invoiceId })).status).toBe("pending");
  });
  test("marks a verified payment paid and safely accepts a retry", async () => {
    expect((await POST(callback("10000"))).status).toBe(200);
    expect((await POST(callback("10000"))).status).toBe(200);
    expect((await payload.findByID({ collection: "invoices", id: invoiceId })).status).toBe("paid");
    expect((await POST(callback("10000", undefined, "-2"))).status).toBe(200);
    const attempts = await payload.find({ collection: "payment-attempts", where: { reference: { equals: reference } } });
    expect(attempts.docs[0].status).toBe("paid");
  });
});
