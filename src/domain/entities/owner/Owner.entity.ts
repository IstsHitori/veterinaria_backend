export class Owner {
  constructor(
    private readonly id: string,
    private readonly name: string,
    private readonly email: string,
    private readonly phone: string,
    private readonly address: string,
    private readonly createdAt: Date,
    private readonly updatedAt: Date | null,
    private readonly deletedAt: Date | null,
    private readonly deletedBy: string | null,
    private readonly isDeleted: boolean,
    private readonly registeredBy: string
  ) {}

}