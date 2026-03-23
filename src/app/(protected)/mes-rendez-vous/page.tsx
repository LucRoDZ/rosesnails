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
import { AppointmentSkeletonList } from "@/components/ui/SkeletonCard";
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
  const canManage = !isPast && appointment.status === "confirmed";
  const manageUrl = `https://cal.com/booking/${appointment.external_event_id}`;

  return (
    <article
      className={`appointment-card ${isPast ? "appointment-card--past" : "appointment-card--upcoming"} rounded-3xl`}
    >
      <div className="flex-1 min-w-0" style={{ padding: "1.15rem" }}>
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3
              className="font-semibold"
              style={{ fontSize: "1rem", color: "var(--neutral-800)", lineHeight: 1.3 }}
            >
              {appointment.service_name}
            </h3>
            <p
              className="capitalize mt-1.5 text-sm"
              style={{ fontSize: "0.875rem", color: "var(--neutral-700)" }}
            >
              {date}
            </p>
            <p
              className="mt-1"
              style={{ fontSize: "0.8125rem", color: "var(--neutral-700)", opacity: 0.55 }}
            >
              {time} · {duration} min
            </p>
          </div>
          <div className="flex-shrink-0">
            <StatusBadge status={appointment.status} />
          </div>
        </div>

        {appointment.notes && (
          <p
            className="mt-4 p-3 rounded-xl text-xs leading-relaxed"
            style={{ color: "var(--neutral-700)", background: "rgba(255,240,245,0.8)", border: "1px solid rgba(189,17,72,0.1)" }}
          >
            {appointment.notes}
          </p>
        )}

        {canManage && (
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <a
              href={manageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline w-full justify-center"
              style={{ fontSize: "0.8125rem", padding: "0.55rem 1rem" }}
              aria-label={`Voir les détails du rendez-vous du ${date}`}
            >
              Voir détails
            </a>
            <a
              href={manageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full justify-center"
              style={{ fontSize: "0.8125rem", padding: "0.55rem 1rem" }}
              aria-label={`Annuler le rendez-vous du ${date}`}
            >
              Annuler
            </a>
          </div>
        )}
      </div>
    </article>
  );
}

function EmptyState({ label }: { label: string }) {
  return (
    <div
      className="py-16 flex flex-col items-center gap-5 rounded-2xl"
      style={{ background: "var(--rose-50)", border: "1px solid var(--border-rose)" }}
    >
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center"
        style={{ background: "white", border: "1px solid var(--border-rose)", fontSize: "1.75rem" }}
        aria-hidden="true"
      >
        💅
      </div>
      <p className="text-sm font-medium" style={{ color: "var(--neutral-700)" }}>{label}</p>
      <Link href="/#booking" className="btn-primary" style={{ fontSize: "0.875rem", padding: "0.625rem 1.5rem" }}>
        Prendre rendez-vous
      </Link>
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
        Impossible de charger vos rendez-vous. Veuillez réessayer.
      </div>
    );
  }

  return (
    <>
      {/* À venir */}
      <section aria-labelledby="upcoming-title" className="mb-12">
        <h2
          id="upcoming-title"
          className="uppercase mb-5"
          style={{ fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.2em", color: "var(--rose-principal)" }}
        >
          À venir
        </h2>
        {upcoming.length === 0 ? (
          <EmptyState label="Aucun rendez-vous à venir. Réservez dès maintenant !" />
        ) : (
          <>
            <div className="space-y-4">
              {upcoming.map((a) => (
                <AppointmentCard key={a.id} appointment={a} />
              ))}
            </div>
            <div className="mt-8 mb-2 flex justify-center">
              <Link href="/#booking" className="btn-primary" style={{ fontSize: "0.875rem", padding: "0.72rem 1.7rem" }}>
                Prendre un nouveau rendez-vous
              </Link>
            </div>
          </>
        )}
      </section>

      {/* Historique */}
      {past.length > 0 && (
        <section aria-labelledby="past-title">
          <h2
            id="past-title"
            className="uppercase mb-5"
            style={{ fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.2em", color: "var(--neutral-700)" }}
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
        style={{
          background:
            "linear-gradient(180deg, #fff 0%, #fff8fb 42%, #fdfbf9 100%)",
        }}
      >
        <div className="shell max-w-5xl">
          <div className="mb-10 md:mb-12">
            <span className="section-label">Mon espace</span>
            <div className="divider-rose" />
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 6vw, 3.2rem)",
                fontWeight: 600,
                lineHeight: 1.04,
                letterSpacing: "-0.015em",
                color: "var(--neutral-800)",
              }}
            >
              Mes <em style={{ fontStyle: "italic", color: "var(--rose-principal)" }}>rendez-vous</em>
            </h1>
            <p className="mt-3 text-sm md:text-base max-w-xl" style={{ color: "var(--neutral-700)" }}>
              Consultez, gérez et annulez vos créneaux à venir en quelques secondes.
            </p>
          </div>

          <Suspense fallback={<AppointmentSkeletonList count={3} />}>
            <AppointmentsList userId={userId} />
          </Suspense>
        </div>
      </main>
      <Footer />
    </>
  );
}
