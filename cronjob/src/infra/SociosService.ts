import { SocioBE, SocioListItem, SocioWrap } from "src/dto/SociosBE";
import { AppConst_Paths } from "./../common/CommonConstants";
import axios from "axios";
import socio_mock from './../mock/socio.json'
import { Generator } from "src/Generator";
import { fa, faker } from '@faker-js/faker';
import dayjs from "dayjs";

export default class SociosService {
    public Search(startModifDate: string, qt: number): Promise<SocioListItem[]> {


        const apiURL = `${AppConst_Paths.ESTADIO_API_URL}/21/qt/${qt}/listsocios`;

        const data = JSON.stringify({
            fromModif: startModifDate//"2023-12-06T18:47:49.627Z",
        });

        const config = {
            method: "post",
            url: apiURL,
            data,
            headers: this.setHeader()
        };

        return axios<SocioListItem[]>(apiURL, config)
            .then((res) => {

                const socios = res.data;
                return socios;
            });

    }

    public get(socioId: number): Promise<SocioBE> {

        //http://192.168.2.106:7076/estadio/21/socio/5233/socio
        const apiURL = `${AppConst_Paths.ESTADIO_API_URL}/21/socio/${socioId}/socio`;

        const config = {
            method: "post",
            url: apiURL,
            Headers: this.setHeader(),
            data: {
                "document": null
            }
        };

        return axios<SocioWrap>(apiURL, config)
            .then((res) => {


                return res.data.socio;
            });

    }

    public getfake(): SocioBE {
        const randomDate = new Date();

        //const socioWrap = res.data as SocioWrap;
        const socioWrap: SocioWrap = JSON.parse(JSON.stringify(socio_mock)) as SocioWrap;
        const socio = socioWrap.socio;
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
        return socioWrap.socio;


    }
    setHeader() {
        return {
            // crossDomain: "true",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "Origin, Content-Type, Authorization, X-Auth-Token",
        };

    };
    

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
