import { createHash, createHmac, timingSafeEqual } from "node:crypto";

export function signIpaymuRequest(method: string, va: string, apiKey: string, body: string): string {
  const bodyHash = createHash("sha256").update(body).digest("hex");
  return createHmac("sha256", apiKey).update(`${method.toUpperCase()}:${va}:${bodyHash}:${apiKey}`).digest("hex");
}

export function verifyIpaymuCallback(raw: Record<string, unknown>, signature: string, va: string): boolean {
  if (!va || !/^[a-f0-9]{64}$/i.test(signature)) return false;
  const normalized: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(raw)) {
    if (key === "signature") continue;
    if (["trx_id", "status_code", "transaction_status_code", "paid_off"].includes(key)) {
      const number = Number(value);
      if (!Number.isSafeInteger(number)) return false;
      normalized[key] = number;
    } else if (key === "is_escrow") normalized[key] = value === true || value === "true" || value === "1" || value === 1;
    else if (key === "additional_info") normalized[key] = value === "[]" ? [] : value;
    else normalized[key] = String(value);
  }
  if (!("additional_info" in normalized)) normalized.additional_info = [];
  const sorted = Object.fromEntries(Object.entries(normalized).sort(([a], [b]) => a.localeCompare(b)));
  const body = JSON.stringify(sorted).replace(/\//g, "\\/");
  const calculated = createHmac("sha256", va).update(body).digest();
  return timingSafeEqual(calculated, Buffer.from(signature, "hex"));
}

type CheckoutInput = { va: string; apiKey: string; mode: "sandbox" | "production"; reference: string; amount: number; description: string; baseUrl: string };

export function isIpaymuCheckoutUrl(value: string, mode: "sandbox" | "production"): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "https:" && url.hostname === (mode === "sandbox" ? "sandbox.ipaymu.com" : "my.ipaymu.com") && !url.username && !url.password && !url.port;
  } catch { return false; }
}

export async function createCheckout(input: CheckoutInput, request: (url: string, init: RequestInit) => Promise<Response> = fetch) {
  if (!input.va || !input.apiKey || !Number.isSafeInteger(input.amount) || input.amount < 1) throw new Error("Invalid payment configuration or invoice amount.");
  const site = new URL(input.baseUrl);
  if (site.protocol !== "https:" || site.username || site.password) throw new Error("The public site URL must use HTTPS.");
  const host = input.mode === "sandbox" ? "sandbox.ipaymu.com" : "my.ipaymu.com";
  const body = JSON.stringify({ product: [input.description], qty: ["1"], price: [String(input.amount)], description: [input.description], returnUrl: new URL("/portal?payment=return", site).href, cancelUrl: new URL("/portal?payment=cancel", site).href, notifyUrl: new URL("/api/portal/ipaymu/callback", site).href, referenceId: input.reference });
  const response = await request(`https://${host}/api/v2/payment`, {
    method: "POST",
    headers: { "Content-Type": "application/json", va: input.va, signature: signIpaymuRequest("POST", input.va, input.apiKey, body), timestamp: new Date().toISOString().replace(/[-:T]/g, "").slice(0, 14) },
    body,
    signal: AbortSignal.timeout(15000),
  });
  if (!response.ok) throw new Error("Payment provider request failed.");
  const result: unknown = await response.json();
  if (!result || typeof result !== "object" || !("Status" in result) || result.Status !== 200 || !("Data" in result) || !result.Data || typeof result.Data !== "object" || !("SessionID" in result.Data) || typeof result.Data.SessionID !== "string" || !("Url" in result.Data) || typeof result.Data.Url !== "string") throw new Error("Invalid response from payment provider.");
  const url = new URL(result.Data.Url);
  if (!isIpaymuCheckoutUrl(url.href, input.mode)) throw new Error("Invalid checkout URL.");
  return { sessionId: result.Data.SessionID, url: url.href };
}
