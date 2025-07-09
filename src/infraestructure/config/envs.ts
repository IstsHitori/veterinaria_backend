import "dotenv/config";
import env from "env-var";

export const envs = {
  PORT: env.get("PORT").required().asPortNumber(),
  MONGO_URL: env.get("MONGO_URL").required().asString(),
  MONGO_DB_NAME: env.get("MONGO_DB_NAME").required().asString(),
  JWT_SEED: env.get("JWT_SEED").required().asString(),
  MAILER_SERVICE: env.get("MAILER_SERVICE").required().asString(),
  MAILER_EMAIL: env.get("MAILER_EMAIL").required().asEmailString(),
  MAILER_SECRET_KEY: env.get("MAILER_SECRET_KEY").required().asString(),
  WEBSERVICE_URL: env.get("WEBSERVICE_URL").required().asString(),
  NODE_ENV: env.get("NODE_ENV").required().default("dev").asString(),
  SEND_EMAIL: env.get("SEND_EMAIL").required().asBool(),
  FRONT_URL: env.get("FRONT_URL").required().asString(),
};
