import type { AppointmentStatus } from "@/types/database";

const statusConfig: Record<
  AppointmentStatus,
  { label: string; className: string }
> = {
  pending: {
    label: "En attente",
    className: "bg-amber-100 text-amber-800",
  },
  confirmed: {
    label: "Confirmé",
    className: "bg-green-100 text-green-800",
  },
  cancelled: {
    label: "Annulé",
    className: "bg-neutral-100 text-neutral-600",
  },
  completed: {
    label: "Terminé",
    className: "bg-blue-100 text-blue-800",
  },
  no_show: {
    label: "Non présenté",
    className: "bg-red-100 text-red-800",
  },
};

export function StatusBadge({ status }: { status: AppointmentStatus }) {
  const config = statusConfig[status] ?? statusConfig.pending;
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.className}`}
    >
      {config.label}
    </span>
  );
}
