import { supabase } from "./supabase";
import type { Appointment } from "@/types/database";

export async function getUserAppointments(
  userId: string
): Promise<Appointment[]> {
  const { data, error } = await supabase
    .from("appointments")
    .select("*")
    .eq("user_id", userId)
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
