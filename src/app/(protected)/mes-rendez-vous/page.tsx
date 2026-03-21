import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import {
  getUserAppointments,
  formatAppointmentDate,
  formatAppointmentTime,
  getDurationMinutes,
  isAppointmentPast,
} from "@/lib/appointments";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StatusBadge } from "@/components/ui/StatusBadge";
import type { Appointment } from "@/types/database";

export const metadata: Metadata = {
  title: "Mes rendez-vous",
  description: "Consultez et gérez vos rendez-vous RosesNails",
  robots: { index: false, follow: false },
};

function AppointmentCard({ appointment }: { appointment: Appointment }) {
  const isPast = isAppointmentPast(appointment.start_at);
  const date = formatAppointmentDate(appointment.start_at);
  const time = formatAppointmentTime(appointment.start_at);
  const duration = getDurationMinutes(appointment.start_at, appointment.end_at);

  return (
    <article
      className={`card flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
        isPast ? "opacity-60" : ""
      }`}
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3 mb-2 flex-wrap">
          <h3 className="font-semibold truncate" style={{ color: "var(--neutral-800)" }}>
            {appointment.service_name}
          </h3>
          <StatusBadge status={appointment.status} />
        </div>
        <p className="text-sm capitalize" style={{ color: "var(--neutral-700)" }}>
          {date} à {time}
        </p>
        <p className="text-xs mt-1" style={{ color: "var(--neutral-700)", opacity: 0.6 }}>
          {duration} min
        </p>
      </div>
      {!isPast && appointment.status === "confirmed" && (
        <div className="flex-shrink-0">
          <a
            href={`https://cal.com/booking/${appointment.external_event_id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline text-sm px-4 py-2"
            aria-label={`Gérer le rendez-vous du ${date}`}
          >
            Gérer
          </a>
        </div>
      )}
    </article>
  );
}

function EmptyState({ label }: { label: string }) {
  return (
    <div className="text-center py-12" style={{ color: "var(--neutral-700)", opacity: 0.6 }}>
      <p className="text-sm">{label}</p>
    </div>
  );
}

export default async function MesRendezVousPage() {
  const { userId } = await auth();
  if (!userId) redirect("/");

  let appointments: Appointment[] = [];
  let error: string | null = null;

  try {
    appointments = await getUserAppointments(userId);
  } catch (e) {
    error = e instanceof Error ? e.message : "Une erreur est survenue.";
  }

  const upcoming = appointments.filter(
    (a) => !isAppointmentPast(a.start_at) && a.status !== "cancelled"
  );
  const past = appointments.filter(
    (a) => isAppointmentPast(a.start_at) || a.status === "cancelled"
  );

  return (
    <>
      <Header />
      <main className="min-h-screen pt-24 pb-16" style={{ backgroundColor: "var(--neutral-50)" }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <h1
              className="text-3xl md:text-4xl font-bold mb-2"
              style={{ fontFamily: "var(--font-display)", color: "var(--neutral-800)" }}
            >
              Mes rendez-vous
            </h1>
            <p style={{ color: "var(--neutral-700)" }}>
              Retrouvez ici tous vos rendez-vous passés et à venir.
            </p>
          </div>

          {error && (
            <div
              className="mb-6 p-4 rounded-xl text-sm font-medium"
              style={{ background: "var(--rose-50)", color: "var(--rose-principal)" }}
              role="alert"
            >
              {error}
            </div>
          )}

          {/* Upcoming appointments */}
          <section aria-labelledby="upcoming-title" className="mb-12">
            <h2
              id="upcoming-title"
              className="text-sm font-bold uppercase tracking-widest mb-6"
              style={{ color: "var(--rose-principal)" }}
            >
              À venir
            </h2>
            {upcoming.length === 0 ? (
              <EmptyState label="Aucun rendez-vous à venir. Réservez dès maintenant !" />
            ) : (
              <div className="space-y-4">
                {upcoming.map((a) => (
                  <AppointmentCard key={a.id} appointment={a} />
                ))}
              </div>
            )}
            <div className="mt-6">
              <Link href="/#booking" className="btn-primary text-sm">
                Prendre un nouveau rendez-vous
              </Link>
            </div>
          </section>

          {/* Past appointments */}
          {past.length > 0 && (
            <section aria-labelledby="past-title">
              <h2
                id="past-title"
                className="text-sm font-bold uppercase tracking-widest mb-6"
                style={{ color: "var(--neutral-700)" }}
              >
                Historique
              </h2>
              <div className="space-y-4">
                {past.map((a) => (
                  <AppointmentCard key={a.id} appointment={a} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
