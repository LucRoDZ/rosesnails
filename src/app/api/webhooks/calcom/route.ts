import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase";
import { verifyCalcomWebhookSignature, extractCalcomSignature } from "@/lib/webhook";
import type { AppointmentStatus } from "@/types/database";

interface CalcomBookingPayload {
  triggerEvent: string;
  uid?: string;
  payload?: {
    uid: string;
    type: string;
    title: string;
    startTime: string;
    endTime: string;
    attendees?: Array<{
      email: string;
      name: string;
      externalId?: string;
    }>;
    responses?: {
      email?: { value: string };
      name?: { value: string };
    };
    metadata?: Record<string, string>;
    status?: string;
  };
}

function mapCalcomStatus(triggerEvent: string): AppointmentStatus {
  switch (triggerEvent) {
    case "BOOKING_CREATED":
      return "confirmed";
    case "BOOKING_RESCHEDULED":
      return "confirmed";
    case "BOOKING_CANCELLED":
      return "cancelled";
    case "BOOKING_REJECTED":
      return "cancelled";
    default:
      return "pending";
  }
}

export async function POST(request: NextRequest) {
  let rawBody: string;

  try {
    rawBody = await request.text();
  } catch {
    console.error("[webhook] Failed to read body");
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  // Vérification signature
  const signature = extractCalcomSignature(request);
  console.info("[webhook] Incoming request — signature present:", !!signature);

  if (!signature || !verifyCalcomWebhookSignature(rawBody, signature)) {
    console.warn("[webhook] Signature invalide — requête rejetée");
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: CalcomBookingPayload;
  try {
    body = JSON.parse(rawBody) as CalcomBookingPayload;
  } catch {
    console.error("[webhook] JSON invalide");
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { triggerEvent, payload } = body;

  // Cal.com ping test — répondre 200 sans traitement
  if (!triggerEvent || triggerEvent === "PING") {
    console.info("[webhook] Ping test reçu — pong");
    return NextResponse.json({ message: "pong" }, { status: 200 });
  }

  const eventData = payload;

  console.info("[webhook] Événement reçu:", triggerEvent);
  console.info("[webhook] Booking UID:", eventData?.uid ?? body.uid ?? "MANQUANT");
  console.info("[webhook] Attendees:", JSON.stringify(eventData?.attendees ?? []));
  console.info("[webhook] Metadata:", JSON.stringify(eventData?.metadata ?? {}));

  // Support uid au niveau racine ou dans payload selon la version Cal.com
  const externalEventId = eventData?.uid ?? body.uid;
  if (!externalEventId) {
    console.error("[webhook] UID manquant dans le payload");
    return NextResponse.json({ error: "Missing event uid" }, { status: 400 });
  }

  const supabase = createServerSupabaseClient();

  // Idempotence : événement déjà traité ?
  const eventKey = `${triggerEvent}:${externalEventId}`;
  const { data: existingEvent } = await supabase
    .from("webhook_events")
    .select("id")
    .eq("event_id", eventKey)
    .maybeSingle();

  if (existingEvent) {
    console.info(`[webhook] Doublon ignoré: ${eventKey}`);
    return NextResponse.json({ message: "Already processed" }, { status: 200 });
  }

  // Extraction de l'identifiant utilisateur
  // Priorité: clerkUserId dans metadata > externalId > email
  const attendeeEmail =
    eventData?.attendees?.[0]?.email ??
    eventData?.responses?.email?.value ??
    null;

  const userId =
    eventData?.metadata?.clerkUserId ??
    eventData?.attendees?.[0]?.externalId ??
    attendeeEmail ??
    "unknown";

  console.info(`[webhook] user_id qui sera stocké: "${userId}" (email: "${attendeeEmail}")`);

  const status = mapCalcomStatus(triggerEvent);
  const now = new Date().toISOString();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error: upsertError } = await (supabase.from("appointments") as any).upsert(
    {
      user_id: userId,
      external_event_id: externalEventId,
      service_name: eventData?.title ?? eventData?.type ?? "Prestation",
      start_at: eventData?.startTime,
      end_at: eventData?.endTime,
      status,
      notes: null,
    },
    { onConflict: "external_event_id", ignoreDuplicates: false }
  );

  if (upsertError) {
    console.error("[webhook] Erreur upsert Supabase:", JSON.stringify(upsertError));
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }

  console.info(`[webhook] ✓ RDV sauvegardé — booking: ${externalEventId}, user: ${userId}`);

  // Log idempotence (non bloquant)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error: logError } = await (supabase.from("webhook_events") as any).insert({
    event_id: eventKey,
    event_type: triggerEvent,
    payload: body as unknown as Record<string, unknown>,
    processed_at: now,
  });

  if (logError) {
    console.warn("[webhook] Log idempotence échoué (non bloquant):", logError.message);
  }

  return NextResponse.json({ message: "OK" }, { status: 200 });
}
