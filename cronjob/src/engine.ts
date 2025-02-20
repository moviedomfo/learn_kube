import { Color } from "colors";
import { Helper } from "./common/helper";
import * as cron from 'node-cron';
import { SocioBE, SocioWrap } from "./dto/SociosBE";
import SociosRepo from "./infra/SociosRepo";
import SociosService from "./infra/SociosService";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { AppConstants } from "./common/CommonConstants";
import { DateFunctions } from "./common/DateFunctions";
import { ReportBE } from "./dto/ReportBE";
import LogsService from "./infra/LogsService";
dayjs.extend(utc);

export class Engine {
  private _sociosRepo: SociosRepo;
  private _sociosService: SociosService;
  private _logsService: LogsService;

  /**
   * prevents jonns being interrupted
   */
  private isRunning: boolean;


  constructor() {
    this.isRunning = false; // Variable para controlar el estado de ejecución
    this._sociosRepo = new SociosRepo();
    this._logsService = new LogsService();
    this._sociosService = new SociosService();

  }

  /**
   * Call an oimplement the sheduling and execute DoWork
   */
  public async Start() {

    //"*/1 10-17 * * *" | Every minute de 10 AM a 5 PM  (10 a 17)
    //"* 10-17 * * *"   | Every minute de 10 AM a 5 PM   (10 a 17)
    //"*/5 * * * *"     | Every 5 minutes  
    //cron.schedule("*/1 * * * *", async () => {
    cron.schedule(AppConstants.APP_SCHEDULING, async () => {

      if (this.isRunning) {
        return;
      }
      this.isRunning = true; // set as excecution
      try {

        //await this.DoWork(); // exec the work
        await this.DoWorkCreator(); // exec the work

      } finally {
        this.isRunning = false; //  Release lock upon completion
      }

    });
  }

  /**
   * This methods does all the work. It has the logic of calling dababase repository, APIs an perform
   *  all neccesary logs an error controls
   */
  async DoWork(): Promise<void> {
    try {

      await Helper.Log("---------------------Start working---------------------- ", true);
      const limit = parseInt(AppConstants.APP_LIMITS.toString());
      let startDateString = await Helper.getLastUpdate();
      //let startDate = dayjs.utc(startDateString).toDate();

      while (true) {


        await Helper.Log(`Fetching next ${limit} SOCIOS from  ${startDateString} `, true);


        // Generar un número aleatorio
        const randomNumber = Math.floor(Math.random() * 10000); // Número aleatorio entre 0 y 9999
        await Helper.Log(`Random number generated: ${randomNumber}`, true);
        // Verificar si el número es divisible por 7
        if (randomNumber % 7 === 0) {
          await Helper.Log(`Random number ${randomNumber} is divisible by 7. Stopping the loop.`, true);

          break; // Detener el bucle
        }
        // Pausar por 1 segundo
        await this.sleep(1);
      }
      await Helper.Log("---------------------End working---------------------- ", true);
    }
    catch (error) {
      Helper.LogErrorFull("Error working", error, true);

    }

  }

  /**
   * this code is only for test porpouses
   */
  async DoWorkCreator(): Promise<void> {
    try {

      while (true) {
        await Helper.Log(`Generating Socio `, true);
        const socio = await this._sociosService.getfake();


        await this._sociosRepo.Insert(socio);

        await Helper.Log(`End generating ${socio.documento} `, true);
        // Generar un número aleatorio
        const randomNumber = Math.floor(Math.random() * 10000); // Número aleatorio entre 0 y 9999
        await Helper.Log(`Random number generated: ${randomNumber}`, true);
        // Verificar si el número es divisible por 7
        if (randomNumber % 7 === 0) {
          await Helper.Log(`Random number ${randomNumber} is divisible by 7. Stopping the loop.`, true);

          break; // Detener el bucle
        }
        await Helper.Log("---------------------End working---------------------- ", true);
      }
    }
    catch (error) {
      Helper.LogErrorFull("Error working", error, true);

    }

  }








  /**
   * Función para realizar la pausa (sleep) 
   * @param s 
   * @returns 
   */
  sleep = (s: number): Promise<void> => {
    const ms = s * 1000;
    return new Promise(resolve => setTimeout(resolve, ms));
  };


  socioslistConsole = (socios: SocioBE[]) => {
    socios.forEach(async s => {

      const msg = `${s.documento} ${s.ultimaModificacion} `
      await Helper.Log(msg, false);
    })

  }





}
