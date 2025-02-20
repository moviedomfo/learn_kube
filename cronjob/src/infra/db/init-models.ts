import type { Sequelize } from "sequelize";
import { Reports as _Reports } from "./Reports";
import { Socios as _Socios } from "./Socios";
import type { SociosAttributes, SociosCreationAttributes } from "./Socios";
import type { ReportsAttributes, ReportsCreationAttributes } from "./Reports";

export {

  _Socios as Socios,
  _Reports as Reports,
};

export type {


  SociosAttributes,
  SociosCreationAttributes,
  ReportsAttributes,
  ReportsCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const Socios = _Socios.initModel(sequelize);
  const Reports = _Reports.initModel(sequelize);

  return {

    Socios: Socios,
    Reports: Reports
  };
}
