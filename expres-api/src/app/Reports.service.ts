import { IReportsService } from "@domain/interfases/IReportsService";
import { IReportsRepository } from "./interfases/IReportsRepository";
import { AppConstants } from "@common/CommonConstants";
import { Response } from 'express';
import { DateFunctions } from "@common/helpers";
import { SearchReportsRes } from "./DTOs/Reports/SearchReportsISVC";
import { IApiLogsRepository } from "./interfases/IApiLogsRepository";
import { SearchApiLogsRes } from "./DTOs/Logs/SearchApiLogsISVC";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

export default class ReportsService implements IReportsService {


  constructor(private readonly reportsRepo: IReportsRepository, private readonly apiLogsRepo: IApiLogsRepository) { }

  /**
   * 
   * @param startDate 
   * @param endDate 
   * @param offset 
   * @param limit 
   * @returns 
   */
  public async Search(startDate: string, endDate: string, offset: number, limit: number): Promise<SearchReportsRes> {

    const startDateParsed = dayjs.utc(startDate.toString()).toDate();

    let endEndParsed;
    if (endDate) {
      endEndParsed = dayjs.utc(endDate.toString()).toDate();
    }
    else {
      endEndParsed = dayjs.utc(startDate.toString()).toDate();
    }
    
    return await this.reportsRepo.Search(startDateParsed, endEndParsed, offset, limit);
  }

  /**
   * 
   * @param startDate 
   * @param endDate 
   * @param offset 
   * @param limit 
   * @returns 
   */
  public async SearchApiLogs(startDate: string, endDate: string, offset: number, limit: number): Promise<SearchApiLogsRes> {
    const startDateParsed = dayjs.utc(startDate.toString()).toDate();


    let endEndParsed;
    if (endDate) {
      endEndParsed = dayjs.utc(endDate.toString()).toDate();
    }
    else {
      endEndParsed = dayjs.utc(startDate.toString()).toDate();
    }
    return await this.apiLogsRepo.Search(startDateParsed, endEndParsed, offset, limit);
  }

  /**
   * 
   * @param res 
   * @param startDate 
   * @param endDate 
   */
  public async SearchCsv(res: Response, startDate: string, endDate?: string): Promise<void> {

    const startDateParsed = dayjs.utc(startDate.toString()).toDate();


    let endEndParsed;
    if (endDate) {
      endEndParsed = dayjs.utc(endDate.toString()).toDate();
    }
    else {
      endEndParsed = dayjs.utc(startDate.toString()).toDate();
    }

    const root = `${AppConstants.APP_FILES_PATH}`;
    const files: string[] = [];
    let currentDate = startDateParsed;
    const finalDate = startDateParsed ?? startDateParsed;

    /**Generate file names array */
    while (currentDate <= finalDate) {
      const formattedDate = DateFunctions.getFileNamePrefix_FromDate(currentDate);
      const fileName = `${root}/${formattedDate}socios_report.csv`;
      files.push(fileName);
      currentDate = this.addDays(currentDate, 1);
    }

    await this.reportsRepo.AddFilesToZip(files, res);

  }



  addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

}
