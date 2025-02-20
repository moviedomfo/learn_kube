import * as dotenv from 'dotenv';
dotenv.config();

export const AppConstants = {
  APP_NAME: process.env.APP_NAME || "Socios olecram",
  APP_BOLETERIA_BASE_URL: process.env.APP_BOLETERIA_BASE_URL || "http://localhost:44301",
  APP_FILES: process.env.APP_FILES,
  APP_REPORTS: process.env.APP_REPORTS,
  APP_SCHEDULING: process.env.APP_SCHEDULING || "*/5 * * * *",
  APP_LIMITS: process.env.APP_LIMITS || 5,
  BD_HOST: process.env.BD_HOST,
  BD_INSTANCE: process.env.BD_INSTANCE,
  BD_DATABASE_NAME: process.env.BD_DATABASE_NAME,
  BD_PWD: process.env.BD_PWD,
  BD_USER: process.env.BD_USER,
  DB_PORT: process.env.BD_PORT,
  BD_LOG: process.env.BD_LOG,
  BD_LOCAL: process.env.BD_LOCAL,
};

export const AppConst_Paths = {

  ESTADIO_API_URL: `${AppConstants.APP_BOLETERIA_BASE_URL}/estadio`,

};
