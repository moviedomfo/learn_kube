import { Reports, initModels, ReportsAttributes } from "./db/init-models";
import sequelize from "./db/Sequelize-sql-db";
import { Helper } from "../common/helper";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from 'dayjs/plugin/timezone';
import { ReportBE } from "src/dto/ReportBE";
import { DateFunctions } from "src/common/DateFunctions";

dayjs.extend(utc);
dayjs.extend(timezone);
const SERVICE_TIMEZONE = "America/Buenos_Aires";

const convertToUTC = (date: Date) => {
    if (!date)
        return date;
    //return dayjs(date).tz(SERVICE_TIMEZONE).utc().toDate();
    return dayjs.utc(date).toDate();
};

export default class ReportRepo {



    
    public Insert(report: ReportBE): Promise<void> {

        const fechaModif = dayjs.utc(report.fechaModif.toString()).toDate();
        report.fecha= dayjs().toDate();
        return new Promise<void>(async (resolve, reject) => {
            const reportAtt: ReportsAttributes = {
                // Id:1,
                fechaModif: convertToUTC(fechaModif),
                action: report.action,
                numSocio: report.numSocio,
                fecha: convertToUTC(report.fecha),
            };

            try {

                initModels(sequelize);

                await Reports.create(reportAtt, {});

                resolve();
            } catch (err) {
                reject(err);
            }
        });
    }



}
