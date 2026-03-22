import { createServerSupabaseClient } from "./supabase";
import type { Appointment } from "@/types/database";

/**
 * Récupère les rendez-vous d'un utilisateur.
 * Cherche par clerkUserId ET par email (pour les réservations faites avant connexion).
 */
export async function getUserAppointments(
  userId: string,
  email?: string
): Promise<Appointment[]> {
  const supabase = createServerSupabaseClient();

  // Double recherche : par Clerk userId OU par email (fallback webhook)
  const filter = email
    ? `user_id.eq.${userId},user_id.eq.${email}`
    : `user_id.eq.${userId}`;

  const { data, error } = await supabase
    .from("appointments")
    .select("*")
    .or(filter)
    .order("start_at", { ascending: false });

  if (error) {
    console.error("[appointments] fetch error:", error);
    throw new Error("Impossible de récupérer vos rendez-vous.");
  }

  return data ?? [];
}

export function formatAppointmentDate(isoString: string): string {
  return new Intl.DateTimeFormat("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(isoString));
}

export function formatAppointmentTime(isoString: string): string {
  return new Intl.DateTimeFormat("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(isoString));
}

export function getDurationMinutes(start: string, end: string): number {
  return Math.round(
    (new Date(end).getTime() - new Date(start).getTime()) / 60000
  );
}

export function isAppointmentPast(startAt: string): boolean {
  return new Date(startAt) < new Date();
}
