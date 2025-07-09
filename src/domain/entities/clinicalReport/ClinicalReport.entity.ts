export class ClinicalReport {
    constructor(
        private readonly id: string,
        private readonly patientId: string,
        private readonly veterinarianId: string,
        private readonly diagnosis: string,
        private readonly treatment: string,
        private readonly isActive: boolean,
        private readonly deletedAt: Date | null,
        private readonly deletedBy: string | null,
        private readonly isDeleted: boolean,
        private readonly createdAt: Date,
        private readonly updatedAt: Date | null,
    ) {}
}