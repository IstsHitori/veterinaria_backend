import { DatabaseError } from "@/domain/errors/DatabaseError";
import mongoose from "mongoose";
import { Logger } from "@/infraestructure/utils/logger";
import { BadRequest } from "@/domain/errors/BadRequest";

export class MongoConnection {
  static async connect(url: string) {
    try {
      const { connection } = await mongoose.connect(url);
      if (!connection.db) {
        throw new DatabaseError(
          "Error al conectarse con la base de datos de MongoDB"
        );
      }
      Logger.showDatabaseInfo(connection.db.databaseName, url);
    } catch (error) {
      if (error instanceof DatabaseError) throw error;
      throw new BadRequest("Error en conectarse a MongoDB");
    }
  }
}
