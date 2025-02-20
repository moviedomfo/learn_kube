import { Sequelize } from "sequelize";

import { AppConstants } from "../../common/CommonConstants";
import { Helper } from "../../common/helper";

const user = AppConstants.BD_USER;
const database = AppConstants.BD_DATABASE_NAME;
const password = AppConstants.BD_PWD;
// const host = process.env.BD_HOST!;
// const logging = Helper.parseBoolean(AppConstants.BD_LOG);
const logging = Helper.parseBoolean(AppConstants.BD_LOG)
  ? (msg: string) => console.log(`[Sequelize]: ${msg}`)
  : false;
const local = Helper.parseBoolean(AppConstants.BD_LOCAL);

const dbremoto = new Sequelize(database, user, password, {
  dialect: "mssql",
  host: AppConstants.BD_HOST,
  port: Number(AppConstants.DB_PORT),
  dialectOptions: {
    instanceName: AppConstants.BD_INSTANCE,
    encrypt: false,
    requestTimeout: 10000,
    trustServerCertificate: true, // Confía en el certificado del servidor si es necesario
  },
  logging,
});


const db_local_te = new Sequelize(database, user, password, {
  host: AppConstants.BD_HOST,
  dialect: 'mssql',
  dialectOptions: {
    options: {

      // server: AppConstants.BD_HOST,
      instanceName: AppConstants.BD_INSTANCE,
      encrypt: false,
      truestedConnection: true,
    },
    trustServerCertificate: true,
  },
  logging
});
const db = getDB();

export default db;


function getDB() {

  const msg = local ? 'db_local_te' : 'dbremoto';
  Helper.Log(`Database ${msg}`, true)
  return local ? db_local_te : dbremoto;

}
