import { AuthUser } from "@/domain/entities/user/AuthUser";
import { BadRequest } from "@/domain/errors/BadRequest";
import { NotFound } from "@/domain/errors/NotFound";
import { AuthRepositorie } from "@/domain/repositories/auth/AuthRepositorie";

export class GetProfile {
  constructor(private readonly authRepository: AuthRepositorie) {}

  async execute(id: string): Promise<AuthUser> {
    try {
      const userProfile = await this.authRepository.findByIdForAuth(id);
      if (!userProfile)
        throw new NotFound("No se encontró el perfil del usuario");
      return userProfile;
    } catch (error) {
      throw new BadRequest(
        "Ha ocurrido un error al obtener el perfil del usuario"
      );
    }
  }
}
