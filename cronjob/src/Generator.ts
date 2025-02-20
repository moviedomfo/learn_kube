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

dayjs.extend(utc);
import { fa, faker } from '@faker-js/faker';
import { parse } from "path";

export class Generator {

  private _sociosService: SociosService;


  // parseInt(faker.finance.accountNumber());

  async generatePerson(): Promise<SocioBE> {

    const socio = await this._sociosService.getfake();
    const randomDate = new Date();
    socio.numSocio = this.generateRandomNroSocio();
    socio.documento = this.generateRandomDNI();
    socio.nombre = faker.person.firstName();
    socio.vencimientoAbono = this.generateRandomDate(randomDate);
    socio.ultimaModificacion = dayjs.utc(randomDate).toDate();
    socio.sector = faker.animal.bear.name;
    socio.seccion = faker.phone.number();
    socio.categoria = faker.company.name();
    //p.precioCategoria = faker.commerce.price(100,3000,0);
    return socio;
  }


  generateRandomDNI(): number {
    const min = 10000000; // Mínimo valor para 8 dígitos
    const max = 99999999; // Máximo valor para 8 dígitos

    // Generar número aleatorio entre min y max
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

    // Convertir a string para mantener el formato de 8 dígitos
    return randomNumber;
  }
  generateRandomNroSocio(): number {
    const min = 10000; // Mínimo valor para 8 dígitos
    const max = 99999; // Máximo valor para 8 dígitos

    // Generar número aleatorio entre min y max
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

    // Convertir a string para mantener el formato de 8 dígitos
    return randomNumber;
  }
  generateRandomDate = (baseDate: Date): Date => {
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

