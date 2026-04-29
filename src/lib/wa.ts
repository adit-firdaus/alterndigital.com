/** Build WhatsApp `wa.me` links from plain-text messages. */

export function waMeUrl(whatsappE164: string, message: string): string {
  const e164 = whatsappE164.replace(/^\+/, "");
  return `https://wa.me/${e164}?text=${encodeURIComponent(message)}`;
}

/** Decode URL-encoded waText segments (e.g. from legacy CMS values) for human-readable chat text. */
function decodeWaToken(token: string): string {
  try {
    return decodeURIComponent(token);
  } catch {
    return token;
  }
}

export function waPricingInterestUrl(
  whatsappE164: string,
  waLegalSuffix: string,
  waTextEncoded: string,
): string {
  const subject = decodeWaToken(waTextEncoded);
  const msg = `Halo, saya tertarik dengan ${subject} ${waLegalSuffix}`.trim();
  return waMeUrl(whatsappE164, msg);
}

export function waServiceInterestUrl(
  whatsappE164: string,
  waLegalSuffix: string,
  serviceWaTextEncoded: string,
): string {
  const subject = decodeWaToken(serviceWaTextEncoded);
  const msg = `Halo, saya tertarik dengan ${subject} ${waLegalSuffix}`.trim();
  return waMeUrl(whatsappE164, msg);
}
