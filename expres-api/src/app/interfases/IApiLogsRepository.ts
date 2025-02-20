import { ApiLogsDTO } from '@app/DTOs/Logs/ApiLogsDTO';
import { SearchApiLogsRes } from '@app/DTOs/Logs/SearchApiLogsISVC';

export interface IApiLogsRepository {
  Insert: (log: ApiLogsDTO) => Promise<void>;
  Search: (startDate: Date, endDate: Date, offset?: number, limit?: number) => Promise<SearchApiLogsRes>;

}
