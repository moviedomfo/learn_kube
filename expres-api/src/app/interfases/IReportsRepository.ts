import { SearchReportsRes } from '@app/DTOs/Reports/SearchReportsISVC';
import { Response } from 'express';

export interface IReportsRepository {
  AddFilesToZip: (fileNames: string[], res: Response) => Promise<void>;
  Search: (startDate: Date, endDate: Date, offset?: number, limit?: number) => Promise<SearchReportsRes>;

}
