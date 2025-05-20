
import { NextFunction, Request, Response } from "express";
import { parse_Int } from "@common/helpers/paramsValidators";
import { ISociosService } from "@domain/interfases/ISociosService";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);
export default class SociosController {
  constructor(private readonly sociosService: ISociosService) { }

  public GetById = async (req: Request, res: Response, next: NextFunction) => {
    try {

      const { id } = req.params;
      if (!id) {
        res.status(400).json({ message: "El parametro numSocio es obligatorio" });
        return;
      }
      const numSocioParsed = parse_Int(id as string); // Página actual

      const result = await this.sociosService.Get(numSocioParsed);
      if (result.socio) res.status(200).send(result);
      else res.status(204).send();
    } catch (e) {
      next(e);
    }
  };

  public GetAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { startDate, limit, offset } = req.query;
      if (!startDate) {
        res.status(400).json({ message: "El parametro startDate es obligatorio" });
        return;
      }
      if (!limit) {
        res.status(400).json({ message: "El parametro limit es obligatorio" });
        return;
      }
      if (!offset) {
        res.status(400).json({ message: "El parametro offset es obligatorio" });
        return;
      }

      const offsetParsed = parse_Int(offset as string); // Página actual
      const limitParsed = parse_Int(limit as string); // Tamaño de página
      const startDateParsed = dayjs.utc(startDate.toString()).toDate();

      const result = await this.sociosService.Search(startDateParsed, offsetParsed, limitParsed);

      if (result) res.status(200).send(result);
      else res.status(204).send();
    } catch (e) {
      next(e);
    }
  };



  public SearchSimpleView = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { startDate, limit, offset } = req.query;
      if (!startDate) {
        res.status(400).json({ message: "El parametro startDate es obligatorio" });
      }
      if (!limit) {
        res.status(400).json({ message: "El parametro limit es obligatorio" });
        return;
      }
      if (!offset) {
        res.status(400).json({ message: "El parametro offset es obligatorio" });
        return;
      }
      const offsetParsed = parse_Int(offset as string); // Página actual
      const limitParsed = parse_Int(limit as string); // Tamaño de página

      // const startDateMal = new Date(startDate.toString());
      // const startDateMal_Totroing = startDateMal.toString();
      // const startDateMal_Formatted = dayjs(startDate.toString()).utc().format();
      // const startDateMal_Formatted1 = dayjs(startDate.toString()).format();

      //Sin esta conversion la fecha que llega al service lo hace en -3GTM
      //Si llega 2024-06-01 21:56:03.257 +00:00 sequalize lo pasa a  2024-06-02 00:56:03.257 +00:00 
      //Por lo tanto se debe convertir a utc y luego a la region donde esta el servicio 
      //de modo que quede 2024-06-01 18:56:03.257 +00:00 y se envie  2024-06-01 21:56:03.257
      const startDateParsed = dayjs.utc(startDate.toString()).toDate();

      const result = await this.sociosService.SearchSimpleView(startDateParsed, offsetParsed, limitParsed);

      if (result) res.status(200).send(result);
      else res.status(204).send();
    } catch (e) {
      next(e);
    }
  };

  public Exist = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { numSocio, ultimaModifi } = req.query;

      if (!numSocio) {
        res.status(400).json({ message: "El parametro numSocio es obligatorio" });
        return;
      }

      if (!ultimaModifi) {
        res.status(400).json({ message: "El parametro ultimaModifi es obligatorio" });
        return;
      }

      const numSocioParsed = parse_Int(numSocio as string); // Tamaño de página
      // const ultimaModifiParced = new Date(ultimaModifi.toString());
      const ultimaModifiParced = dayjs.utc(ultimaModifi.toString()).toDate();
      const result = await this.sociosService.Exist(numSocioParsed, ultimaModifiParced);

      if (result) res.status(200).send(result);
      else res.status(204).send();
    } catch (e) {
      next(e);
    }
  };

}
