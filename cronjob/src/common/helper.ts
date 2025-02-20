//import { DateTime } from "../node_modules/luxon";
import colors from 'colors';
import { writeFile } from 'fs/promises';
//import * as Color from "colors";
import dayjs from "dayjs";
import "dayjs/locale/es";
import * as fs from 'fs';

import { ExeptionFunctions } from './ExeptionFunctions';
import { AppConstants } from './CommonConstants';
import { CsvDTO } from '../dto/CSV';
import { DateFunctions } from './DateFunctions';

export class Helper {

  public static CreateDir(folderName: string): Promise<void> {

    if (fs.existsSync(folderName))
      return;
    return new Promise<void>((resolve, reject) => {

      fs.mkdir(folderName, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });


    });
  }
  public static WriteFile(fileName: string, data: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      fs.writeFile(fileName, data, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  public static AppendFile(fileName: string, data: string): Promise<void> {


    return new Promise<void>((resolve, reject) => {
      fs.appendFile(fileName, data, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
  public static async replaseFile(fileName: string, data: string): Promise<void> {

    await writeFile(fileName, data);

    // return new Promise<void>((resolve, reject) => {
    //   fs.writeFile(fileName, data, (err) => {
    //     if (err) {
    //       reject(err);
    //     } else {
    //       resolve();
    //     }
    //   });
    // });
  }

  public static OpenFile(fileName: string): Promise<string> {
    return new Promise<string>((resolve, _reject) => {
      var json = fs.readFileSync(fileName, "utf8");
      // console.log(json);
      resolve(json);
    });
  }

  public static saveFile = (_fileName: string, _content: string) => ({});


  public static async Move(source: string, dest: string): Promise<any> {
    return new Promise<any>(async (resolve, reject) => {
      try {
        fs.rename(source, dest, function (err) {
          if (err) {
            Helper.MoveLinux(source, dest);
          }

          resolve("Moved");
          Helper.Log(`File moved successfully : ${dest} dest`);
        });
      } catch (error) {
        //if (error.code === "EXDEV") {
        const appErr = ExeptionFunctions.GetAppError(error);

        Helper.LogError(
          `Error moving file ${source} + ${appErr.originalMessage}`
        );
        reject(error);

      }
    });
  }

  public static async MoveLinux(source: string, dest: string): Promise<any> {
    return new Promise<any>(async (resolve, reject) => {
      try {
        fs.copyFile(source, dest, (err) => {
          if (!err) resolve("");
          else reject(err);
        });
        // Remove the old file
        fs.unlink(source, (err) => {
          if (!err) resolve("");
          else reject(err);
        });
      } catch (err) {
        reject(err);

      }
    });
  }

  /**
   * Gets Date from string
   * @param dateString
   * @returns the Date
   */
  public static parseDate(dateString: string): Date | null {
    let f: Date;
    if (dateString) {
      f = new Date(dateString);

      return f;
    } else {
      return null;
    }
  }
  /** Convert strings as  'true', 'TRUE' , 'false', 'yes','0' and so on to boolean*/
  public static parseBoolean = (stringValue: string): boolean => {
    // const bool_value = value.toLowerCase() == 'true' ? true : false;
    // return bool_value;


    switch (stringValue?.toLowerCase()?.trim()) {
      case 'true':
      case 'yes':
      case '1':
        return true;

      case 'false':
      case 'no':
      case '0':
      case null:
      case undefined:
        return false;

      default:
        return JSON.parse(stringValue);
    }

  };


  /**
   * 
   * @param message 
   * @param save true to save in file
   */
  public static async Log(message: string, save: boolean = true): Promise<void> {

    let log = DateFunctions.getTime_Iso() + " INFO ";
    log = log.concat(message, "\n");
    console.log(colors.green(log));


    try {
      if (save) {
        const logFileName = `${AppConstants.APP_FILES}/${DateFunctions.getFileNamePrefix()}logs.txt`;
        await Helper.AppendFile(logFileName, log);
      }

    } catch (error) {
      console.error(
        `Got an error trying to write to a file: ${error.message}\n`
      );

    }

  }

  /**
    * Create or update csv file
    * @param data 
    */
  public static async AppendCSV(data: CsvDTO): Promise<void> {


    data.Fecha = DateFunctions.getTime_Iso();
    let csvContent = '';
    const fileFileName = `${AppConstants.APP_REPORTS}/${DateFunctions.getFileNamePrefix()}socios_report.csv`;

    try {
      let fileExists = Helper.Exist(fileFileName);

      if (!fileExists) {
        csvContent += 'Fecha,NumSocio,FechaModif,Action\n'; // Header
      }
      csvContent += `${data.Fecha},${data.NumSocio},${data.FechaModif},${data.Action}\n`;

      await Helper.AppendFile(fileFileName, csvContent);


    } catch (error) {
      console.error(
        `Got an error trying to write to a file ${fileFileName}: ${error.message}\n`
      );

    }

  }

  public static async LogError(message: string, save: boolean = true): Promise<void> {


    let log = DateFunctions.getTime_Iso() + " ERROR ";
    log = log.concat(message, "\n");
    console.log(colors.red(log));

    if (save) {
      const logFileName = `${AppConstants.APP_FILES}/${DateFunctions.getFileNamePrefix()}logs.txt`;
      await Helper.AppendFile(logFileName, log);
    }

  }

  public static async LogErrorFull(message: string, error: any, save: boolean = true): Promise<void> {

    const appErr = ExeptionFunctions.GetAppError(error);
    Helper.LogError(message, save);

    await Helper.LogError(appErr.message, save);

    console.log(
      colors.red(
        await DateFunctions.getTime() + " " + message + "\n" + appErr.message + "\n" + appErr.originalMessage
      )
    );
  }

  /**
   * store last processed date
   * @param lastUpdate 
   */
  public static async SaveLastUpdate_(lastUpdate: string): Promise<void> {

    try {
      const logFileName = `${AppConstants.APP_FILES}/lastUpdate.txt`;

      await Helper.AppendFile(logFileName, lastUpdate);

    } catch (error) {
      console.error(
        `Got an error trying to write to a file: ${error.message}\n`
      );
    }
  }

  /**
   * store last processed date
   * @param lastUpdate 
   */
  public static async SaveLastUpdate(lastUpdate: string): Promise<void> {

    try {
      const fileFileName = `${AppConstants.APP_FILES}/lastUpdate.txt`;

      await Helper.replaseFile(fileFileName, lastUpdate);

    } catch (error) {
      console.error(
        `Got an error trying to write to a file: ${error.message}\n`
      );
    }
  }

  /**
   * returns the last processed date. if not exist, returns "1900-01-01T00:00:00"
   * @returns last date 
   */
  public static async getLastUpdate(): Promise<string> {

    const lastDate = "1900-01-01T00:00:00";

    const fileFileName = `${AppConstants.APP_FILES}/lastUpdate.txt`;

    try {

      if (Helper.Exist(fileFileName) === false) {
        return lastDate;
      }
      const lastDateFromFile = await Helper.OpenFile(fileFileName);
      if (Helper.isNullOrEmpty(lastDateFromFile))
        return lastDate;

      return lastDateFromFile;

    } catch (error) {
      console.error(
        `Got an error trying to write to a file: ${error.message}\n`
      );
    }
  }

  /**
   * Verifica si un archivo existe en la ruta especificada.
   * @param filePath - La ruta del archivo a verificar.
   * @returns `true` si el archivo existe, `false` en caso contrario.
   */
  public static Exist(filePath: string): boolean {
    return fs.existsSync(filePath);
  }
  // public static GetError(error: any): string {
  //   let message = error.message;
  //   if (error.response)
  //     message = message.concat(error.response.data.Message, "\n");
  //   return message;
  // }
  public static isNullOrEmpty(value: string): boolean {
    const isNull = value === '' || value === undefined || value === null;
    return isNull;
  };




  public static generateRandomNroSocio(): number {
    const min = 1000; // Mínimo valor para 8 dígitos
    const max = 9999; // Máximo valor para 8 dígitos

    // Generar número aleatorio entre min y max
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

    // Convertir a string para mantener el formato de 8 dígitos
    return randomNumber;
  }
  public static generateRandomDate = (baseDate: Date): Date => {
    const randomHours = Math.floor(Math.random() * 24);
    const randomMinutes = Math.floor(Math.random() * 60);

    const randomDate = new Date(baseDate);
    randomDate.setHours(randomHours);
    randomDate.setMinutes(randomMinutes);
    randomDate.setSeconds(0);
    randomDate.setMilliseconds(0);

    return randomDate;
  };

}
