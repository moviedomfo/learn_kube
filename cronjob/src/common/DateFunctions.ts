
import dayjs from "dayjs";
import "dayjs/locale/es";
/**
 * 
 */
export class DateFunctions {

  /* 
    Coinvierte fecha local y retorna a formato ISO  
  */
  public static getTime_Iso() {
    dayjs().locale("es");

    let d = dayjs().toISOString();

    return d;
  }

  public static getTime() {
    dayjs().locale("es");

    let d = dayjs().format('DD/MM/YYYY h:mm A')

    return d;
  }

  /**
   * @returns returns YYYYMMDD_ prefix
   */
  public static getFileNamePrefix(): String {
    const d = dayjs().format("YYYYMMDD_");
    return d;
  }

  /**
   * @returns Retorna 2021_04 
   */
  public static getPeriodo(): string {
    let dt = dayjs().format("YYYY_MM");
    return dt;
  }


  public static getMonth_MM(): String {
    // var dt_local = DateTime.local();
    // return  DateTime.fromISO(dt_local.toString()).toFormat("MM");
    let dt = dayjs().format("MM");
    return dt;
  }

  public static getDay_dd(): String {
    let dt = dayjs().format("d");
    return dt;
  }

  // public static getDateFromt_yyymmyyy_toSQLDate(date: string): Date {
  //   let convertida = DateTime.fromISO(date + "T13:00:00.00");
  //   return convertida.toSQLDate();
  // }

  /**
   * dayjs(date).toISOString();
   * @param date 
   * @returns 
   */
  public static getDateFromt_yyymmyyy_toSQLDate(date: string): string {
    let convertida = dayjs(date).toISOString();
    //let convertida = dayjs(date + "T13:00:00.00").format('YYYY-MM-DDTHH:mm:ssZ[Z]') ;
    return convertida;
  }

  /**
   * Este código hace uso de la biblioteca dayjs para convertir un objeto 
   * Date a un timestamp en formato epoch (segundos desde 1970-01-01T00:00:00Z).
   * @param date 
   * @returns 
   */
  public static getDateEpoch(date: Date): number {
    let epoch = dayjs(date).unix();
    return epoch;
  }
}
