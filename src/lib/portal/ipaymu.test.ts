import { expect, test } from "bun:test";
import { createCheckout, isIpaymuCheckoutUrl, signIpaymuRequest, verifyIpaymuCallback } from "./ipaymu";

test("signs the exact serialized request body using iPaymu's v2 formula", () => {
  const body = '{"product":["Test"],"qty":["1"],"price":["10000"]}';
  expect(signIpaymuRequest("POST", "123456", "demo-key", body)).toBe("3d1d0b7f79d359613b88dac27381f975e8b32ddff1375d54835beaa514d3fc15");
});

test("rejects altered callback payloads and invalid signatures", () => {
  const data = { reference_id: "INV-1", status_code: "1", trx_id: "42", amount: "10000" };
  const signature = "354564f2581be05055f9de24accc5873146194412ee1f1f23f9c1ca3285b1431";
  expect(verifyIpaymuCallback(data, signature, "123456")).toBe(true);
  expect(verifyIpaymuCallback({ ...data, amount: "1" }, signature, "123456")).toBe(false);
  expect(verifyIpaymuCallback(data, "invalid", "123456")).toBe(false);
});

test("creates a sandbox redirect checkout with the server-set price and reference", async () => {
  let sentBody: Record<string, unknown> = {};
  const mockFetch = async (_url: string, init: RequestInit) => {
    sentBody = JSON.parse(String(init?.body));
    return Response.json({ Status: 200, Data: { SessionID: "test-session", Url: "https://sandbox.ipaymu.com/payment/test-session" } });
  };
  const result = await createCheckout({ va: "123", apiKey: "secret", mode: "sandbox", reference: "INV-1", amount: 10000, description: "App project", baseUrl: "https://example.com" }, mockFetch);
  expect(sentBody.price).toEqual(["10000"]);
  expect(sentBody.referenceId).toBe("INV-1");
  expect(result).toEqual({ sessionId: "test-session", url: "https://sandbox.ipaymu.com/payment/test-session" });
});

test("rejects checkout URLs on an unexpected host", async () => {
  const mockFetch = async () => Response.json({ Status: 200, Data: { SessionID: "x", Url: "https://example.net/payment" } });
  expect(createCheckout({ va: "123", apiKey: "secret", mode: "sandbox", reference: "INV-1", amount: 10000, description: "App", baseUrl: "https://example.com" }, mockFetch)).rejects.toThrow();
});

test("only allows sandbox checkout redirects to the exact iPaymu host", () => {
  expect(isIpaymuCheckoutUrl("https://sandbox.ipaymu.com/payment/abc", "sandbox")).toBe(true);
  expect(isIpaymuCheckoutUrl("https://sandbox.ipaymu.com.attacker.test/payment", "sandbox")).toBe(false);
  expect(isIpaymuCheckoutUrl("javascript:alert(1)", "sandbox")).toBe(false);
});
