import { GetSocioByIdRes } from "@app/DTOs/Socios/GetSociosByIdISVC";
import { ISociosRepository } from "./interfases/ISociosRepository";
import { ISociosService } from "@domain/interfases/ISociosService";
import { SearchSociosRes } from "./DTOs/Socios/SearchSociosISVC";
import { SearchSimpleViewSociosRes, SocioSimpleViewDTO } from "./DTOs/Socios/SearchSimpleViewSociosISVC";
import dayjs from "dayjs";
import timezone from 'dayjs/plugin/timezone.js';
import utc from "dayjs/plugin/utc";
import { AppConstants } from "@common/CommonConstants";
dayjs.extend(utc);
dayjs.extend(timezone);

export default class SociosService implements ISociosService {
  private readonly _sociosRepo: ISociosRepository;


  constructor(private readonly sociosRepo: ISociosRepository) {
    this._sociosRepo = sociosRepo;

  }




  /**
   * 
   * @param id socio Id
   * @returns 
  */
  public async Get(id: number): Promise<GetSocioByIdRes> {

    const res = await this._sociosRepo.Get(id);
    return res;
  }

  /**
   * 
   * @param startDate 
   * @param offset 
   * @param limit 
   * @returns 
   */
  public async Search(startDate: Date, offset?: number, limit?: number): Promise<SearchSociosRes> {
    const res = await this._sociosRepo.Search(startDate, offset, limit);
    return res;
  }


  /**
   * 
   * @param startDate 
   * @param offset 
   * @param limit 
   * @returns 
   */
  public async SearchSimpleView(startDate: Date, offset?: number, limit?: number): Promise<SearchSimpleViewSociosRes> {
    const res = await this._sociosRepo.SearchSimpleView(startDate, offset, limit);
    return res;
  }


  /**
   * 
   * @param numSocio 
   * @param ultimaModificacion 
   * @returns 
   */
  public async Exist(numSocio: number, ultimaModificacion: Date): Promise<SocioSimpleViewDTO | null> {


    const res = await this._sociosRepo.Exist(numSocio, ultimaModificacion);
    const dayjsLocal = dayjs.unix(res.ultimaModificacion_epoch);
    const ultimaModificacion_tz = dayjsLocal.tz(AppConstants.APP_TZ).format('YYYY-MM-DDTHH:mm:ss.SSS');
    //const ultimaModificacion_tz_ = dayjs(socio.ultimaModificacion).utc().tz(AppConstants.APP_TZ).format('YYYY-MM-DDTHH:mm:ss.SSS');;
    //res.ultimaModificacion_tz= ultimaModificacion_tz;
    return { ...res, ultimaModificacion_tz };
  }

}
