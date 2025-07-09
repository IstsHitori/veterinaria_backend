import { StatusAppointment } from "./StatusAppointment";

export class Appointment {
  constructor(
    private readonly id: string,
    private readonly patientId: string,
    private readonly veterinarianId: string,
    private readonly scheduledId: string,
    private readonly reason: string,
    private readonly date: Date,
    private readonly status: StatusAppointment,
    private readonly deletedAt: Date | null,
    private readonly deletedBy: string | null,
    private readonly isDeleted: boolean
  ) {}
}
