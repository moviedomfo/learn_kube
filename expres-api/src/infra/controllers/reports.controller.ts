
import { NextFunction, Request, Response } from "express";
import { parse_Int } from "@common/helpers/paramsValidators";
import { IReportsService } from "@domain/interfases/IReportsService";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);
export default class ReportsController {
  constructor(private readonly reportsService: IReportsService) { }

  public SearchCsv = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { startDate, endDate } = req.query;

      if (!startDate) {
        res.status(400).json({ message: "El parametro startDate es obligatorio" });
        return;
      }

      if (!dayjs.utc(startDate.toString()).isValid()) {
        res.status(400).json({ message: "startDate debe ser una fecha válida" });
        return;
      }

      if (!endDate || !dayjs.utc(endDate.toString()).isValid()) {
        res.status(400).json({ message: "endDate debe ser una fecha válida" });
        return;
      }

      await this.reportsService.SearchCsv(res, startDate as string, endDate as string);
      res.status(200).send();
    } catch (e) {
      next(e);
    }
  };

  public Search = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {


      const { startDate, endDate, limit, offset } = req.query;
      const offsetParsed = parse_Int(offset as string); // Página actual
      const limitParsed = parse_Int(limit as string); // Tamaño de página

      if (!startDate) {
        res.status(400).json({ message: "El parametro startDate es obligatorio" });
        return;
      }
      if (!dayjs.utc(startDate.toString()).isValid()) {
        res.status(400).json({ message: "startDate debe ser una fecha válida" });
        return;
      }
      if (!endDate) {
        if (!dayjs.utc(endDate.toString()).isValid()) {
          res.status(400).json({ message: "endDate debe ser una fecha válida" });
          return;
        }
      }


      const response = await this.reportsService.Search(startDate as string, endDate as string, offsetParsed, limitParsed);
      res.status(200).send(response);

    } catch (e) {
      //res.status(500).send('Error creating zip');
      next(e);
    }
  };

  public SearchUsage_logs = async (req: Request, res: Response, next: NextFunction) => {
    try {


      const { startDate, endDate, limit, offset } = req.query;
      const offsetParsed = parse_Int(offset as string); // Página actual
      const limitParsed = parse_Int(limit as string); // Tamaño de página

      if (!startDate) {
         res.status(400).json({ message: "El parametro startDate es obligatorio" });
        return;
      }
      if (!dayjs.utc(startDate.toString()).isValid()) {
        res.status(400).json({ message: "startDate debe ser una fecha válida" });
        return;
      }
      if (!endDate) {
        if (!dayjs.utc(endDate.toString()).isValid()) {
          res.status(400).json({ message: "endDate debe ser una fecha válida" });
          return;
        }
      }



      const response = await this.reportsService.SearchApiLogs(startDate as string, endDate as string, offsetParsed, limitParsed);
      res.status(200).send(response);

    } catch (e) {
      //res.status(500).send('Error creating zip');
      next(e);
    }
  };
}
