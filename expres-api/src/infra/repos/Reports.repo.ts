
import { IReportsRepository } from "@app/interfases/IReportsRepository";
import { AppConstants } from "@common/CommonConstants";
import { Response } from 'express';
import fs from 'fs';
import path from 'path';
import archiver from 'archiver';
import { ReportDTO } from "@app/DTOs/Reports/ReportBE";
import { Op } from "sequelize";
import sequelize from "../db/Sequelize-sql-db";
import { Reports, ReportsAttributes, initModels } from "@infra/db/init-models";
import { DateFunctions } from "@common/helpers";
import { SearchReportsRes } from "@app/DTOs/Reports/SearchReportsISVC";



/**
 * Persist users to file  
 * */
export default class ReportsRepository implements IReportsRepository {


  public async Search(startDate: Date, endDate: Date, offset?: number, limit?: number): Promise<SearchReportsRes> {
    const ultimaModificacion_epoch: number = DateFunctions.getDateEpoch(startDate);


    const where = {
      fecha: {
        [Op.between]: [startDate, endDate]
      },

    };

    return new Promise<SearchReportsRes>(async (resolve, reject) => {
      const res: SearchReportsRes = new SearchReportsRes();
      try {
        initModels(sequelize);

        const { count, rows } = await Reports.findAndCountAll({
          where,
          order: [['fecha', 'ASC']],
          offset,
          limit,
        });

        const reportsList = rows.map(p => mapRpt(p));


        res.reports = reportsList;
        res.count = reportsList.length;
        res.total_count = count;
        resolve(res);
      } catch (err) {
        reject(err);
      }
    });
  }

  public async AddFilesToZip(fileNames: string[], res: Response): Promise<void> {


    // Crear un archivo zip en memoria usando archiver
    const archive = archiver('zip', {
      zlib: { level: 9 } // Nivel de compresión
    });


    // Configura el header de la respuesta
    res.attachment('socios_report.zip');

    // Pone el stream del zip en la respuesta
    archive.pipe(res);
    // Maneja los eventos del archivo zip
    archive.on('warning', (err) => {
      if (err.code === 'ENOENT') {
        console.warn('Warning:', err);
      } else {
        throw err;
      }
    });

    archive.on('error', (err) => {
      throw err;
    });
    for (const fullFileName of fileNames) {
      const filePath = path.resolve(AppConstants.APP_FILES_PATH, fullFileName);
      if (this.fileExists(filePath)) {
        const fileName = path.basename(fullFileName);
        archive.file(filePath, { name: fileName });
      } else {
        console.warn(`File not found: ${filePath}`);
      }
    }
    // Finaliza el archivo zip
    await archive.finalize();
  }

  // Verifica si el archivo existe
  private fileExists(filePath: string): boolean {
    return fs.existsSync(filePath);
  }

}
const mapRpt = (reportFromBD: ReportsAttributes): ReportDTO => {

  const report: ReportDTO = {

    numSocio: reportFromBD.numSocio,
    fecha: reportFromBD.fecha,
    fechaModif: reportFromBD.fechaModif,
    action: reportFromBD.action,

  };

  return report;
}