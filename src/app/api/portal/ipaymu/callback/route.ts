import { getPayloadCached } from "@/lib/payload";
import { verifyIpaymuCallback } from "@/lib/portal/ipaymu";

export async function POST(request: Request) {
  const va = process.env.IPAYMU_VA;
  if (process.env.IPAYMU_MODE !== "sandbox" || !va) return new Response("Unavailable", { status: 503 });
  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/x-www-form-urlencoded")) return new Response("Unsupported content type", { status: 415 });
  const body = await request.text();
  if (body.length > 32768) return new Response("Too large", { status: 413 });
  const params = new URLSearchParams(body);
  const data: Record<string, string> = {};
  for (const [key, value] of params) {
    if (Object.hasOwn(data, key)) return new Response("Invalid payload", { status: 400 });
    data[key] = value;
  }
  const signature = request.headers.get("x-signature") || "";
  if (!verifyIpaymuCallback(data, signature, va)) return new Response("Invalid signature", { status: 400 });
  const reference = data.reference_id || data.referenceId;
  if (!reference || (data.reference_id && data.referenceId && data.reference_id !== data.referenceId)) return new Response("Invalid reference", { status: 400 });
  const payload = await getPayloadCached();
  const attempts = await payload.find({ collection: "payment-attempts", where: { reference: { equals: reference } }, limit: 1, depth: 0 });
  const attempt = attempts.docs[0];
  if (!attempt) return new Response("Unknown reference", { status: 400 });
  const invoice = await payload.findByID({ collection: "invoices", id: typeof attempt.invoice === "object" ? attempt.invoice.id : attempt.invoice, depth: 0 });
  if (!/^\d+$/.test(data.amount || "") || Number(data.amount) !== invoice.amount || (attempt.sessionId && data.sid !== attempt.sessionId)) return new Response("Transaction mismatch", { status: 400 });
  if (data.status_code === "1") {
    if (invoice.status !== "paid") await payload.update({ collection: "invoices", id: invoice.id, data: { status: "paid" } });
    await payload.update({ collection: "payment-attempts", id: attempt.id, data: { status: "paid", transactionId: data.trx_id } });
  } else if (data.status_code === "-2") {
    await payload.update({ collection: "payment-attempts", where: { and: [{ id: { equals: attempt.id } }, { status: { not_equals: "paid" } }] }, data: { status: "expired" } });
  }
  return Response.json({ status: "OK" });
}
