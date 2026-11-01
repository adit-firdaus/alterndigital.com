import { beforeAll, describe, expect, test } from "bun:test";
import { getPayload, type Payload } from "payload";
import config from "@payload-config";
import { siteGlobalSeed } from "@/seed/site-global-defaults";

let payload: Payload;
let alice: Awaited<ReturnType<Payload["create"]>>;
let bob: Awaited<ReturnType<Payload["create"]>>;
let orderId: number;

beforeAll(async () => {
  payload = await getPayload({ config });
  await payload.updateGlobal({ slug: "site", data: siteGlobalSeed });
  const run = crypto.randomUUID();
  alice = await payload.create({ collection: "customers", data: { name: "Alice", email: `alice-${run}@example.test`, password: "testing-password-1", identityConfirmed: true } });
  bob = await payload.create({ collection: "customers", data: { name: "Bob", email: `bob-${run}@example.test`, password: "testing-password-2", identityConfirmed: true } });
  const order = await payload.create({ collection: "orders", data: { title: "Alice project", customer: alice.id, category: "mobile", requirements: "A real test requirement", status: "submitted" } });
  orderId = order.id;
});

describe("customer isolation", () => {
  test("rejects short passwords at the server boundary", async () => {
    await expect(payload.create({ collection: "customers", overrideAccess: false, data: { name: "Test", email: `${crypto.randomUUID()}@example.test`, password: "short" } })).rejects.toThrow();
  });
  test("does not return the password after registration", async () => {
    const created = await payload.create({ collection: "customers", overrideAccess: false, data: { name: "Test", email: `${crypto.randomUUID()}@example.test`, password: "test-password-123" } });
    expect(created).not.toHaveProperty("password");
  });
  test("a customer cannot list another customer's project", async () => {
    const user = { ...bob, collection: "customers" as const };
    const result = await payload.find({ collection: "orders", user, overrideAccess: false });
    expect(result.docs).toHaveLength(0);
    const own = await payload.find({ collection: "orders", user: { ...alice, collection: "customers" as const }, overrideAccess: false });
    expect(own.docs).toHaveLength(1);
  });

  test("a customer cannot modify website content or create invoices", async () => {
    const user = { ...alice, collection: "customers" as const };
    await expect(payload.updateGlobal({ slug: "site", data: { brandShort: "Compromised" }, user, overrideAccess: false })).rejects.toThrow();
    await expect(payload.create({ collection: "invoices", data: { number: "fake", customer: alice.id, order: 1, description: "fake", amount: 1, dueDate: new Date().toISOString(), status: "paid" }, user, overrideAccess: false })).rejects.toThrow();
  });
  test("an existing staff user can still edit CMS content", async () => {
    const staff = await payload.create({ collection: "users", data: { email: `${crypto.randomUUID()}@example.test`, password: "test-password-123" } });
    const site = await payload.updateGlobal({ slug: "site", data: { brandShort: "Test brand" }, user: { ...staff, collection: "users" }, overrideAccess: false });
    expect(site.brandShort).toBe("Test brand");
  });

  test("a customer cannot mark their own identity as confirmed", async () => {
    const fresh = await payload.create({ collection: "customers", data: { name: "New customer", email: `${crypto.randomUUID()}@example.test`, password: "testing-password-3" } });
    const user = { ...fresh, collection: "customers" as const };
    const updated = await payload.update({ collection: "customers", id: fresh.id, user, overrideAccess: false, data: { identityConfirmed: true } });
    expect(updated.identityConfirmed).toBe(false);
  });

  test("an invoice cannot belong to someone other than the order's customer", async () => {
    await expect(payload.create({ collection: "invoices", data: { number: crypto.randomUUID(), customer: bob.id, order: orderId, description: "Invoice", amount: 10000, dueDate: new Date().toISOString(), status: "pending" } })).rejects.toThrow();
  });
});
