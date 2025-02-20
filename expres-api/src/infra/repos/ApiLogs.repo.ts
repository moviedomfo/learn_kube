
import { IApiLogsRepository } from "@app/interfases/IApiLogsRepository";
import { Op } from "sequelize";
import sequelize from "../db/Sequelize-sql-db";
import { api_logs, api_logsAttributes, initModels } from "@infra/db/init-models";
import { DateFunctions } from "@common/helpers";
import { SearchApiLogsRes } from "@app/DTOs/Logs/SearchApiLogsISVC";
import { ApiLogsDTO } from "@app/DTOs/Logs/ApiLogsDTO";



/**
 * Persist logs api consume
 * */
export default class ApiLogsRepository implements IApiLogsRepository {


  public async Search(startDate: Date, endDate: Date, offset?: number, limit?: number): Promise<SearchApiLogsRes> {
    const ultimaModificacion_epoch: number = DateFunctions.getDateEpoch(startDate);


    const where = {
      fecha: {
        [Op.between]: [startDate, endDate]
      },

    };

    return new Promise<SearchApiLogsRes>(async (resolve, reject) => {
      const res: SearchApiLogsRes = new SearchApiLogsRes();
      try {
        initModels(sequelize);

        const { count, rows } = await api_logs.findAndCountAll({
          where,
          order: [['fecha', 'ASC']],
          offset,
          limit,
        });

        const ApiLogsList = rows.map(p => mapRpt(p));


        res.logs = ApiLogsList;
        res.count = ApiLogsList.length;
        res.total_count = count;
        resolve(res);
      } catch (err) {
        reject(err);
      }
    });
  }

  public async Insert(log: ApiLogsDTO): Promise<void> {


    return new Promise<void>(async (resolve, reject) => {
      try {
        initModels(sequelize);

        const item: api_logsAttributes = {
          client_ip: log.client_ip,
          fecha: log.fecha,
          http_method: log.http_method,
          response_time_ms: log.response_time_ms,
          response_code: log.response_code,
          endpoint: log.endpoint,
          user_agent: log.user_agent
        };
        await api_logs.create(item, {});

        resolve();
      } catch (err) {
        reject(err);
      }
    });
  }



}

const mapRpt = (logFromBD: api_logsAttributes): ApiLogsDTO => {

  const item: ApiLogsDTO = {
    client_ip: logFromBD.client_ip,
    fecha: logFromBD.fecha,
    http_method: logFromBD.http_method,
    response_time_ms: logFromBD.response_time_ms,
    response_code: logFromBD.response_code,
    endpoint: logFromBD.endpoint
  };

  return item;
}