import { SociosDE } from "@domain/Entities/SociosDE";
import { GetSocioByIdRes } from "@app/DTOs/Socios/GetSociosByIdISVC";
import { SearchSociosRes } from "@app/DTOs/Socios/SearchSociosISVC";
import { SearchSimpleViewSociosRes, SocioSimpleViewDTO } from "@app/DTOs/Socios/SearchSimpleViewSociosISVC";



export interface ISociosService {


  /**
   * 
   * @param id Customer Id
   * @returns 
   */
  Get: (id: number) => Promise<GetSocioByIdRes>;


  /**
   * 
   * @param startDate 
   * @param page 
   * @param limit 
   * @returns 
   */
  Search: (startDate?: Date, page?: number, limit?: number) => Promise<SearchSociosRes>;

  /**
   * return reduced startDate 
   * @param startDateParsed 
   * @param offset 
   * @param limit 
   * @returns 
   */
  SearchSimpleView: (startDate: Date, offset: number, limit: number) => Promise<SearchSimpleViewSociosRes>;

  /**
   * 
   * @param numSocio 
   * @param ultimaModificacion 
   * @returns 
   */
  Exist: (numSocio: number, ultimaModificacion: Date) => Promise<SocioSimpleViewDTO | null>;

}
