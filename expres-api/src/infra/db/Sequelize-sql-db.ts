import { Sequelize } from "sequelize";

import { AppConstants } from "../../common/CommonConstants";

const user = AppConstants.BD_USER;
const database = AppConstants.BD_DATABASE_NAME;
const password = AppConstants.BD_PWD;
// const host = process.env.BD_HOST!;



const dbremoto = new Sequelize(database, user, password, {
  dialect: "mssql",
  host: AppConstants.BD_HOST,
  port: Number(AppConstants.DB_PORT),
  logging: AppConstants.BD_LOG === true ? console.log : false, // ✅ Asegura que logging sea válido
  dialectOptions: {
    instanceName: AppConstants.BD_INSTANCE,
    encrypt: false,
    requestTimeout: 30000,
    trustServerCertificate: true, // Confía en el certificado del servidor si es necesario


  },
});



const db_local = new Sequelize(database, user, password, {
  host: AppConstants.BD_HOST,
  dialect: 'mssql',
  dialectOptions: {
    options: {
      // server: AppConstants.BD_HOST,
      instanceName: AppConstants.BD_INSTANCE,
      database,
      encrypt: false, // Esto es necesario para conexiones locales no cifradas
      trustServerCertificate: true,
      truestedConnection: true,


    },
    trustServerCertificate: true,
  },
  logging: AppConstants.BD_LOG === true ? console.log : false, // ✅ Asegura que logging sea válido

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
  logging: AppConstants.BD_LOG === true ? console.log : false, // ✅ Asegura que logging sea válido

});
const db = getDB();

export default db;


function getDB() {
  const db = AppConstants.BD_LOCAL ? db_local_te : dbremoto;
  // if (AppConstants.BD_LOCAL === true)
  //   return db_local_te;
  // else
  //   return dbremoto;
  return db
}
