import { BadRequest } from "@/domain/errors/BadRequest";
import { NotFound } from "@/domain/errors/NotFound";
import { UpdateProfileData } from "@/domain/interfaces/user/user.interfaces";
import { UserRepositorie } from "@/domain/repositories/user/UserRepositorie";
import { Email } from "@/domain/value-objects/Email";

export class UpdateProfile {
  constructor(private readonly userRepository: UserRepositorie) {}

  async execute(idUser: string, updateData: Partial<UpdateProfileData>) {
    try {
      if (updateData.email) {
        //Validar email
        const emailValidated = Email.create(updateData.email);
        //Validar que el email no esté en uso
        const existsEmail = await this.userRepository.existsEmail(
          emailValidated.getValue()
        );
        if (existsEmail) throw new BadRequest("El email ya está en uso");
      }
      const foundUser = await this.userRepository.findUserByID(idUser);
      if (!foundUser) throw new NotFound("No se encontró el usuario");

      const emailChanged = updateData.email && updateData.email !== foundUser.email;

      await this.userRepository.updateProfile(idUser, updateData);

      return { emailChanged };
    } catch (error) {
      if (error instanceof NotFound) throw error;
      if (error instanceof BadRequest) throw error;
      throw new BadRequest("Error al actualizar el perfil");
    }
  }
}
