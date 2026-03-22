import crypto from "crypto";

export function verifyCalcomWebhookSignature(
  payload: string,
  signature: string
): boolean {
  const secret = process.env.CALCOM_WEBHOOK_SECRET;

  if (!secret) {
    console.warn("[webhook] CALCOM_WEBHOOK_SECRET not set — accepting in dev, rejecting in prod");
    return process.env.NODE_ENV === "development";
  }

  try {
    const expected = crypto
      .createHmac("sha256", secret)
      .update(payload, "utf8")
      .digest("hex");

    const expectedBuf = Buffer.from(expected, "hex");
    const signatureBuf = Buffer.from(signature, "hex");

    // timingSafeEqual requires same length — mismatch = invalid signature
    if (expectedBuf.length !== signatureBuf.length) {
      console.warn("[webhook] Signature length mismatch", {
        expected: expectedBuf.length,
        received: signatureBuf.length,
        rawSignature: signature.slice(0, 16) + "…",
      });
      return false;
    }

    return crypto.timingSafeEqual(signatureBuf, expectedBuf);
  } catch (err) {
    console.error("[webhook] Signature verification error:", err);
    return false;
  }
}

export function extractCalcomSignature(request: Request): string | null {
  // Cal.com envoie la signature dans x-cal-signature-256
  // Certaines versions envoient un préfixe "sha256=" — on le retire
  const raw =
    request.headers.get("x-cal-signature-256") ??
    request.headers.get("x-webhook-secret") ??
    null;

  if (!raw) return null;
  return raw.startsWith("sha256=") ? raw.slice(7) : raw;
}
