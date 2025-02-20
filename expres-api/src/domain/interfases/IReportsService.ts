
import { SearchApiLogsRes } from '@app/DTOs/Logs/SearchApiLogsISVC';
import { SearchReportsRes } from '@app/DTOs/Reports/SearchReportsISVC';
import { Response } from 'express';

export interface IReportsService {

  /**
   * 
   * @param startDate 
   * @param endDate 
   * @returns 
   */
  SearchCsv: (res: Response, startDate: string, endDate?: string) => Promise<void>;

  /**
   * Retorna logs de transacciones sobre socios. Filtrando por fechas de transacción .- No por fecha ultimaModif de rapi
   * @param startDate 
   * @param endDate 
   * @param offset 
   * @param limit 
   * @returns 
   */
  Search: (startDate: string, endDate: string, offset: number, limit: number) => Promise<SearchReportsRes>;


  /**
   * 
   * @param startDate 
   * @param endDate 
   * @param offset 
   * @param limit 
   * @returns 
   */
  SearchApiLogs: (startDate: string, endDate: string, offset: number, limit: number) => Promise<SearchApiLogsRes>;

}
