import type { Sequelize } from "sequelize";
import { Socios as _Socios } from "./Socios";
import type { SociosAttributes, SociosCreationAttributes } from "./Socios";
import { Reports as _Reports } from "./Reports";
import { ReportsAttributes, ReportsCreationAttributes } from "./Reports";
import { api_logs as _api_logs } from "../db/api_logs";
import type { api_logsAttributes, api_logsCreationAttributes } from "../db/api_logs";

export {
  _Socios as Socios,
  _Reports as Reports,
  _api_logs as api_logs,
};

export type {
  SociosAttributes,
  SociosCreationAttributes,
  ReportsAttributes,
  ReportsCreationAttributes,
  api_logsAttributes,
  api_logsCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const Socios = _Socios.initModel(sequelize);
  const Reports = _Reports.initModel(sequelize);
  const ApiLogs = _api_logs.initModel(sequelize);
  return {

    Socios: Socios,
    Reports: Reports,
    ApiLogs: ApiLogs
  };
}
