import { auth } from "@clerk/nextjs/server";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";
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
import { SkeletonList } from "@/components/ui/SkeletonCard";
import type { Appointment } from "@/types/database";

export const metadata: Metadata = {
  title: "Mes rendez-vous",
  description: "Consultez et gérez vos rendez-vous RosesNails",
  robots: { index: false, follow: false },
};

// ─── Composants de présentation ──────────────────────────────────────────────

function AppointmentCard({ appointment }: { appointment: Appointment }) {
  const isPast = isAppointmentPast(appointment.start_at);
  const date = formatAppointmentDate(appointment.start_at);
  const time = formatAppointmentTime(appointment.start_at);
  const duration = getDurationMinutes(appointment.start_at, appointment.end_at);

  return (
    <article
      className={`card flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
        isPast ? "opacity-55" : ""
      }`}
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3 mb-1.5 flex-wrap">
          <h3 className="font-semibold text-base truncate" style={{ color: "var(--neutral-800)" }}>
            {appointment.service_name}
          </h3>
          <StatusBadge status={appointment.status} />
        </div>
        <p className="text-sm capitalize" style={{ color: "var(--neutral-700)" }}>
          {date} à {time}
        </p>
        <p className="text-xs mt-1" style={{ color: "var(--neutral-700)", opacity: 0.5 }}>
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
    <div
      className="text-center py-10 rounded-2xl border"
      style={{ borderColor: "var(--border-subtle)", color: "var(--neutral-700)", opacity: 0.55 }}
    >
      <p className="text-sm">{label}</p>
    </div>
  );
}

// ─── Composant async pour les RDV (streamé séparément) ───────────────────────

async function AppointmentsList({ userId }: { userId: string }) {
  const { sessionClaims } = await auth();
  const emailFromJwt = (sessionClaims as Record<string, unknown>)?.email as string | undefined;

  let appointments: Appointment[] = [];
  let error: string | null = null;

  try {
    if (emailFromJwt) {
      appointments = await getUserAppointments(userId, emailFromJwt);
    } else {
      const [user, apptsByUserId] = await Promise.all([
        currentUser(),
        getUserAppointments(userId),
      ]);
      const email = user?.primaryEmailAddress?.emailAddress;
      if (apptsByUserId.length === 0 && email) {
        appointments = await getUserAppointments(userId, email);
      } else {
        appointments = apptsByUserId;
      }
    }
  } catch (e) {
    error = e instanceof Error ? e.message : "Une erreur est survenue.";
  }

  const upcoming = appointments.filter(
    (a) => !isAppointmentPast(a.start_at) && a.status !== "cancelled"
  );
  const past = appointments.filter(
    (a) => isAppointmentPast(a.start_at) || a.status === "cancelled"
  );

  if (error) {
    return (
      <div
        className="p-4 rounded-xl text-sm font-medium"
        style={{ background: "var(--rose-50)", color: "var(--rose-principal)" }}
        role="alert"
      >
        Impossible de charger vos rendez-vous. Veuillez réessayer ou contacter le salon.
      </div>
    );
  }

  return (
    <>
      {/* À venir */}
      <section aria-labelledby="upcoming-title" className="mb-12">
        <h2
          id="upcoming-title"
          className="text-[10px] font-bold uppercase tracking-[0.25em] mb-5"
          style={{ color: "var(--rose-principal)" }}
        >
          À venir
        </h2>
        {upcoming.length === 0 ? (
          <EmptyState label="Aucun rendez-vous à venir. Réservez dès maintenant !" />
        ) : (
          <div className="space-y-3">
            {upcoming.map((a) => (
              <AppointmentCard key={a.id} appointment={a} />
            ))}
          </div>
        )}
        <div className="mt-6">
          <Link href="/#booking" className="btn-primary text-sm px-6 py-2.5">
            Prendre un nouveau rendez-vous
          </Link>
        </div>
      </section>

      {/* Historique */}
      {past.length > 0 && (
        <section aria-labelledby="past-title">
          <h2
            id="past-title"
            className="text-[10px] font-bold uppercase tracking-[0.25em] mb-5"
            style={{ color: "var(--neutral-700)", opacity: 0.6 }}
          >
            Historique
          </h2>
          <div className="space-y-3">
            {past.map((a) => (
              <AppointmentCard key={a.id} appointment={a} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}

// ─── Page principale ──────────────────────────────────────────────────────────

export default async function MesRendezVousPage() {
  const { userId } = await auth();
  if (!userId) redirect("/");

  return (
    <>
      <Header />
      <main
        className="min-h-screen pt-24 pb-20"
        style={{ backgroundColor: "var(--neutral-50)" }}
      >
        <div className="max-w-3xl mx-auto px-5 sm:px-8">
          {/* Page header */}
          <div className="mb-10">
            <span className="section-label">Mon espace</span>
            <div className="divider-rose" />
            <h1
              className="text-3xl md:text-4xl font-bold"
              style={{ fontFamily: "var(--font-display)", color: "var(--neutral-800)" }}
            >
              Mes rendez-vous
            </h1>
            <p className="mt-2 text-sm" style={{ color: "var(--neutral-700)" }}>
              Retrouvez ici tous vos rendez-vous passés et à venir.
            </p>
          </div>

          {/* Streaming content */}
          <Suspense fallback={<SkeletonList count={3} />}>
            <AppointmentsList userId={userId} />
          </Suspense>
        </div>
      </main>
      <Footer />
    </>
  );
}
