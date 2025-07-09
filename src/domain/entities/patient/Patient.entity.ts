import { Gender } from "./Gender";
import { Size } from "./Size";

export class Patient {
  constructor(
    private readonly id: string,
    private readonly name: string,
    private readonly breed: string,
    private readonly birthDate: Date,
    private readonly gender: Gender,
    private readonly weight: number,
    private readonly size: Size,
    private readonly history: string,
    private readonly owner: string,
    private readonly createdAt: Date,
    private readonly updatedAt: Date | null,
    private readonly medicalConditions: string[],
    private readonly allergies: string[],
    private readonly isVaccinated: boolean,
    private readonly vaccines: string[],
    private readonly isActive: boolean,
    private readonly deletedAt: Date | null,
    private readonly deletedBy: string | null,
    private readonly isDeleted: boolean,
    private readonly registeredBy: string
  ) {}
}
