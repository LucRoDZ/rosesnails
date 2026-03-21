import type { Appointment, AppointmentStatus } from "./database";

export type { Appointment, AppointmentStatus };

export interface AppointmentWithDisplay extends Appointment {
  formattedDate: string;
  formattedTime: string;
  durationMinutes: number;
  isPast: boolean;
}
