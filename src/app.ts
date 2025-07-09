import { Server } from "@/presentation/server";
import { envs } from "@/infraestructure/config/envs";
import { AppRoutes } from "@/presentation/routes/routes";
import { MongoConnection } from "@/infraestructure/adapters/database/MongoConnection";

(async () => {
  main();
})();

async function main() {
  try {
    await MongoConnection.connect(envs.MONGO_URL);

    const server = new Server({
      port: envs.PORT,
      routes: AppRoutes.routes,
      NODE_ENV: envs.NODE_ENV,
    });
    await server.start();

    // Manejar cierre graceful
    process.on("SIGINT", async () => {
      console.log("Cerrando servidor...");
      await server.stop();
      process.exit(0);
    });
  } catch (error) {
    console.error("Error al iniciar la aplicación:", error);
    process.exit(1);
  }
}
