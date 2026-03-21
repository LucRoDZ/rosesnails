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
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  // Verify webhook signature
  const signature = extractCalcomSignature(request);
  if (!signature || !verifyCalcomWebhookSignature(rawBody, signature)) {
    console.warn("[webhook] Invalid signature");
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: CalcomBookingPayload;
  try {
    body = JSON.parse(rawBody) as CalcomBookingPayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { triggerEvent, payload } = body;
  const eventData = payload;

  if (!eventData?.uid) {
    return NextResponse.json({ error: "Missing event uid" }, { status: 400 });
  }

  const externalEventId = eventData.uid;
  const supabase = createServerSupabaseClient();

  // Idempotency check: have we processed this exact event?
  const eventKey = `${triggerEvent}:${externalEventId}`;
  const { data: existingEvent } = await supabase
    .from("webhook_events")
    .select("id")
    .eq("event_id", eventKey)
    .maybeSingle();

  if (existingEvent) {
    console.info(`[webhook] Duplicate event skipped: ${eventKey}`);
    return NextResponse.json({ message: "Already processed" }, { status: 200 });
  }

  // Extract user identifier from Cal.com attendees
  // Cal.com sends the user's email; match by user metadata if needed
  const attendeeEmail =
    eventData.attendees?.[0]?.email ??
    eventData.responses?.email?.value ??
    null;

  // We store the Clerk user_id in Cal.com metadata or look it up
  // For V1, store the email and resolve later, or require the user to be authenticated
  // The attendee external_id from Cal.com can carry the Clerk userId if configured
  const clerkUserId =
    eventData.attendees?.[0]?.externalId ??
    eventData.metadata?.clerkUserId ??
    attendeeEmail ?? // fallback: store email as user identifier
    "unknown";

  const status = mapCalcomStatus(triggerEvent);
  const now = new Date().toISOString();

  // Upsert appointment — use any-cast to avoid complex Supabase generic resolution
  // The type safety is enforced by the Appointment interface above
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const appointmentsTable = supabase.from("appointments") as any;
  const { error: upsertError } = await appointmentsTable.upsert(
    {
      user_id: clerkUserId,
      external_event_id: externalEventId,
      service_name: (eventData.title ?? eventData.type ?? "Prestation") as string,
      start_at: eventData.startTime as string,
      end_at: eventData.endTime as string,
      status,
      notes: null,
    },
    {
      onConflict: "external_event_id",
      ignoreDuplicates: false,
    }
  );

  if (upsertError) {
    console.error("[webhook] Upsert error:", upsertError);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }

  // Log processed event for idempotency
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const webhookEventsTable = supabase.from("webhook_events") as any;
  const { error: logError } = await webhookEventsTable.insert({
    event_id: eventKey,
    event_type: triggerEvent,
    payload: body as unknown as Record<string, unknown>,
    processed_at: now,
  });

  if (logError) {
    // Non-fatal: appointment was saved, just log
    console.error("[webhook] Event log error:", logError);
  }

  console.info(`[webhook] Processed ${triggerEvent} for booking ${externalEventId}`);
  return NextResponse.json({ message: "OK" }, { status: 200 });
}
