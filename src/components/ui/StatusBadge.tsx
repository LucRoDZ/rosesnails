import type { AppointmentStatus } from "@/types/database";

const statusConfig: Record<
  AppointmentStatus,
  { label: string; bg: string; text: string; dotColor: string }
> = {
  pending: {
    label: "En attente",
    bg: "var(--status-pending-bg)",
    text: "var(--status-pending-text)",
    dotColor: "var(--rose-accent)",
  },
  confirmed: {
    label: "Confirmé",
    bg: "var(--status-confirmed-bg)",
    text: "var(--status-confirmed-text)",
    dotColor: "var(--rose-principal)",
  },
  cancelled: {
    label: "Annulé",
    bg: "var(--status-cancelled-bg)",
    text: "var(--status-cancelled-text)",
    dotColor: "var(--neutral-200)",
  },
  completed: {
    label: "Terminé",
    bg: "var(--status-completed-bg)",
    text: "var(--status-completed-text)",
    dotColor: "var(--neutral-700)",
  },
  no_show: {
    label: "Non présenté",
    bg: "var(--status-no-show-bg)",
    text: "var(--status-no-show-text)",
    dotColor: "var(--rose-clair)",
  },
};

export function StatusBadge({ status }: { status: AppointmentStatus }) {
  const config = statusConfig[status] ?? statusConfig.pending;
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium"
      style={{ background: config.bg, color: config.text }}
    >
      <span
        className={`status-dot${status === "confirmed" ? " status-dot--pulse" : ""}`}
        style={{ background: config.dotColor }}
        aria-hidden="true"
      />
      {config.label}
    </span>
  );
}
