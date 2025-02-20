import { get } from "env-var";
import "dotenv/config";

/**
 * Common constats
 *  env-var permite realizar validaciones sobre las variables de entorno
 *  ayuda a evitar errores en tiempo de ejecución debido a configuraciones incorrectas.
 */
export const AppConstants = {
  COMPANY: "rapi",
  APP_PORT: get("APP_PORT").default("5000").asPortNumber(),
  APP_VERSION: get("APP_VERSION").required().asString(),
  APP_CLIENT_NAME: get("APP_CLIENT_NAME").required().asString(),
  APP_FILES_PATH: process.env.APP_FILES_PATH,
  APP_TZ: "America/Buenos_Aires",
  BD_HOST: get("BD_HOST").asString(),
  BD_INSTANCE: get("BD_INSTANCE").required().asString(),
  DB_PORT: get("BD_PORT").asString(),
  BD_DATABASE_NAME: get("BD_DATABASE_NAME").required().asString(),
  BD_PWD: get("BD_PWD").required().asString(),
  BD_USER: get("BD_USER").required().asString(),
  BD_LOG: get("BD_LOG").asBool(),
  BD_LOCAL: get("BD_LOCAL").asBool(),
  JWT_Expires: 30,//process.env.JWT_Expires,
  JWT_ExpiresRefreshToken: 600,//process.env.JWT_ExpiresRefreshToken,
  JWT_issuer: 'rapiauth',//process.env.JWT_ISSUER,
  JWT_SECRET: 'rapiauth_secret',//process.env.JWT_SECRET,
};
