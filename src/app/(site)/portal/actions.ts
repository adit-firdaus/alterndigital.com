"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getPayloadCached } from "@/lib/payload";
import { parseOrder } from "@/lib/portal/order";
import { createCheckout, isIpaymuCheckoutUrl } from "@/lib/portal/ipaymu";

export async function createOrder(form: FormData) {
  const payload = await getPayloadCached();
  const { user } = await payload.auth({ headers: await headers() });
  if (!user || user.collection !== "customers") redirect("/portal/masuk");
  const input = parseOrder({ title: form.get("title"), category: form.get("category"), requirements: form.get("requirements") });
  if (!input) redirect("/portal/pesan?error=invalid");
  await payload.create({ collection: "orders", data: { ...input, customer: user.id, status: "submitted" } });
  redirect("/portal?created=1");
}

export async function payInvoice(form: FormData) {
  const payload = await getPayloadCached();
  const { user } = await payload.auth({ headers: await headers() });
  if (!user || user.collection !== "customers") redirect("/portal/masuk");
  const id = Number(form.get("invoiceId"));
  if (!Number.isSafeInteger(id) || id < 1) redirect("/portal?payment=invalid");
  const invoice = await payload.findByID({ collection: "invoices", id, depth: 0, user, overrideAccess: false }).catch(() => null);
  if (!invoice || invoice.status !== "pending") redirect("/portal?payment=invalid");
  const { IPAYMU_VA: va, IPAYMU_API_KEY: apiKey, IPAYMU_SITE_URL: baseUrl, IPAYMU_MODE: mode } = process.env;
  if (!va || !apiKey || !baseUrl || mode !== "sandbox") redirect("/portal?payment=unavailable");
  const reference = `INV-${crypto.randomUUID()}`;
  let attempt;
  try {
    attempt = await payload.create({ collection: "payment-attempts", data: { invoice: invoice.id, reference, status: "creating" } });
  } catch {
    const existing = await payload.find({ collection: "payment-attempts", where: { invoice: { equals: invoice.id } }, limit: 1 });
    const found = existing.docs[0];
    if (found?.status === "pending" && found.checkoutUrl && isIpaymuCheckoutUrl(found.checkoutUrl, mode)) redirect(found.checkoutUrl);
    redirect("/portal?payment=review");
  }
  let checkout;
  try {
    checkout = await createCheckout({ va, apiKey, mode, reference, amount: invoice.amount, description: invoice.description, baseUrl });
  } catch {
    await payload.update({ collection: "payment-attempts", where: { and: [{ id: { equals: attempt.id } }, { status: { equals: "creating" } }] }, data: { status: "review" } });
    redirect("/portal?payment=review");
  }
  const updated = await payload.update({ collection: "payment-attempts", where: { and: [{ id: { equals: attempt.id } }, { status: { equals: "creating" } }] }, data: { status: "pending", sessionId: checkout.sessionId, checkoutUrl: checkout.url } });
  if (!updated.docs.length) redirect("/portal?payment=return");
  redirect(checkout.url);
}
