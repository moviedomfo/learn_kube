import { GetSocioByIdRes } from "@app/DTOs/Socios/GetSociosByIdISVC";
import { SearchSimpleViewSociosRes, SocioSimpleViewDTO } from "@app/DTOs/Socios/SearchSimpleViewSociosISVC";
import { SearchSociosRes } from "@app/DTOs/Socios/SearchSociosISVC";


export interface ISociosRepository {

  Get: (id: number) => Promise<GetSocioByIdRes>;
  Search: (startDate: Date, offset?: number, pageSize?: number) => Promise<SearchSociosRes>;
  SearchSimpleView: (startDate: Date, offset?: number, pageSize?: number) => Promise<SearchSimpleViewSociosRes>;
  Exist: (numSocio: number, ultimaModificacion: Date) => Promise<SocioSimpleViewDTO | null>;

}

