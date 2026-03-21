import crypto from "crypto";

const WEBHOOK_SECRET = process.env.CALCOM_WEBHOOK_SECRET ?? "";

export function verifyCalcomWebhookSignature(
  payload: string,
  signature: string
): boolean {
  if (!WEBHOOK_SECRET) {
    console.warn("[webhook] CALCOM_WEBHOOK_SECRET is not set — skipping verification");
    return process.env.NODE_ENV === "development";
  }

  try {
    const expected = crypto
      .createHmac("sha256", WEBHOOK_SECRET)
      .update(payload, "utf8")
      .digest("hex");
    return crypto.timingSafeEqual(
      Buffer.from(signature, "hex"),
      Buffer.from(expected, "hex")
    );
  } catch {
    return false;
  }
}

export function extractCalcomSignature(request: Request): string | null {
  return (
    request.headers.get("x-cal-signature-256") ??
    request.headers.get("x-webhook-secret") ??
    null
  );
}
