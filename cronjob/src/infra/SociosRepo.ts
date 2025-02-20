import { Socios, SociosAttributes } from "./db/Socios";
import { initModels } from "./db/init-models";
import { SocioBE } from "../dto/SociosBE";
import sequelize from "./db/Sequelize-sql-db";
import { Op } from "sequelize";
import { Helper } from "./../common/helper";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from 'dayjs/plugin/timezone';
import { DateFunctions } from "./../common/DateFunctions";


dayjs.extend(utc);
dayjs.extend(timezone);
const SERVICE_TIMEZONE = "America/Buenos_Aires";

const convertToUTC = (date: Date) => {
    if (!date)
        return date;
    //return dayjs(date).tz(SERVICE_TIMEZONE).utc().toDate();
    return dayjs.utc(date).toDate();
};

export default class SociosRepo {
    public Insert(socio: SocioBE): Promise<void> {

        socio.vencimientoAbono = convertToUTC(socio.vencimientoAbono)
        socio.nacimiento = convertToUTC(socio.nacimiento);
        socio.ultimoPago = convertToUTC(socio.ultimoPago);
        socio.ingreso = convertToUTC(socio.ingreso);
        const ultimaModificacion_epoch: number = socio.ultimaModificacion ? DateFunctions.getDateEpoch(socio.ultimaModificacion) : null;
        socio.ultimaModificacion = convertToUTC(socio.ultimaModificacion);



        return new Promise<void>(async (resolve, reject) => {
            const sociosAttributes: SociosAttributes = {
                documento: socio.documento,
                ultimaModificacion_epoch,
                numSocio: socio.numSocio,
                ultimaModificacion: convertToUTC(socio.ultimaModificacion),
                idAbono: socio.idAbono,
                contadorAbono: socio.contadorAbono,
                sector: socio.sector,
                seccion: socio.seccion,
                categoria: socio.categoria,
                precioCategoria: socio.precioCategoria,
                tipoSocio: socio.tipoSocio,
                idTipoSocio: socio.idTipoSocio,
                cobrador: socio.cobrador,
                nombre: socio.nombre,
                tipoDocumento: socio.tipoDocumento,
                calle: socio.calle,
                numero: socio.numero,
                localidad: socio.localidad,
                codigoPostal: socio.codigoPostal,
                telefono: socio.telefono,
                tarjeta: socio.tarjeta,
                contadorSocio: socio.contadorSocio,
                vencimientoAbono: socio.vencimientoAbono,
                ingreso: socio.ingreso,
                nacimiento: socio.nacimiento,
                ultimoPago: socio.ultimoPago,
                estado: socio.estado,
                formaDePago: socio.formaDePago,
                filial: socio.filial,
                idSexo: socio.idSexo,
                sexo: socio.sexo,
                provincia: socio.provincia,
                nacionalidad: socio.nacionalidad,
                celular: socio.celular,
                mail: socio.mail,
                huellas: socio.huellas,
                procedencia: socio.procedencia,
                idEstado: socio.idEstado,
                crc32Foto: socio.crc32Foto,

            };

            try {

                initModels(sequelize);

                await Socios.create(sociosAttributes, {});

                resolve();
            } catch (err) {
                reject(err);
            }
        });
    }

    public update(socio: SocioBE): Promise<void> {

        socio.vencimientoAbono = convertToUTC(socio.vencimientoAbono)
        socio.nacimiento = convertToUTC(socio.nacimiento);
        socio.ultimoPago = convertToUTC(socio.ultimoPago);
        socio.ingreso = convertToUTC(socio.ingreso);
        const ultimaModificacion_epoch: number = socio.ultimaModificacion ? DateFunctions.getDateEpoch(socio.ultimaModificacion) : null;
        socio.ultimaModificacion = convertToUTC(socio.ultimaModificacion);



        return new Promise<void>(async (resolve, reject) => {

            const sociosAttributes: SociosAttributes = {
                documento: socio.documento,
                ultimaModificacion_epoch,
                idAbono: socio.idAbono,
                contadorAbono: socio.contadorAbono,
                sector: socio.sector,
                seccion: socio.seccion,
                categoria: socio.categoria,
                precioCategoria: socio.precioCategoria,
                tipoSocio: socio.tipoSocio,
                idTipoSocio: socio.idTipoSocio,
                cobrador: socio.cobrador,
                nombre: socio.nombre,
                tipoDocumento: socio.tipoDocumento,
                calle: socio.calle,
                numero: socio.numero,
                localidad: socio.localidad,
                codigoPostal: socio.codigoPostal,
                telefono: socio.telefono,
                tarjeta: socio.tarjeta,
                contadorSocio: socio.contadorSocio,
                numSocio: socio.numSocio,
                vencimientoAbono: socio.vencimientoAbono,
                ingreso: socio.ingreso,
                nacimiento: socio.nacimiento,
                ultimoPago: socio.ultimoPago,
                ultimaModificacion: socio.ultimaModificacion,
                estado: socio.estado,
                formaDePago: socio.formaDePago,
                filial: socio.filial,
                idSexo: socio.idSexo,
                sexo: socio.sexo,
                provincia: socio.provincia,
                nacionalidad: socio.nacionalidad,
                celular: socio.celular,
                mail: socio.mail,
                huellas: socio.huellas,
                procedencia: socio.procedencia,
                idEstado: socio.idEstado,
                crc32Foto: socio.crc32Foto
            };

            try {

                initModels(sequelize);

                await Socios.update(sociosAttributes, {
                    where: {
                        numSocio: {

                            [Op.eq]: socio.numSocio,
                        }
                    }
                });

                resolve();
            } catch (err) {
                reject(err);
            }
        });
    }

    public Searh(ultimaModificacion: Date): Promise<SocioBE[]> {

        // const ultimaModificacion_epoch: number = Helper.getDateEpoch(ultimaModificacion) ;

        return new Promise<SocioBE[]>(async (resolve, reject) => {

            try {

                initModels(sequelize);
                const where = {
                    ultimaModificacion: {

                        [Op.gte]: ultimaModificacion,
                    }
                }
                const sociosDB = await Socios.findAll({ where });
                const res = sociosDB.map(s => {
                    const item: SocioBE = {
                        documento: s.documento,
                        idAbono: s.idAbono,
                        ultimaModificacion_epoch: s.ultimaModificacion_epoch,
                        contadorAbono: s.contadorAbono,
                        sector: s.sector,
                        seccion: s.seccion,
                        categoria: s.categoria,
                        precioCategoria: s.precioCategoria,
                        tipoSocio: s.tipoSocio,
                        idTipoSocio: s.idTipoSocio,
                        cobrador: s.cobrador,
                        nombre: s.nombre,
                        tipoDocumento: s.tipoDocumento,
                        calle: s.calle,
                        numero: s.numero,
                        localidad: s.localidad,
                        codigoPostal: s.codigoPostal,
                        telefono: s.telefono,
                        tarjeta: s.tarjeta,
                        contadorSocio: s.contadorSocio,
                        numSocio: s.numSocio,
                        vencimientoAbono: s.vencimientoAbono,
                        ingreso: s.ingreso,
                        nacimiento: s.nacimiento,
                        ultimoPago: s.ultimoPago,
                        ultimaModificacion: s.ultimaModificacion,
                        estado: s.estado,
                        formaDePago: s.formaDePago,
                        filial: s.filial,
                        idSexo: s.idSexo,
                        sexo: s.sexo,
                        provincia: s.provincia,
                        nacionalidad: s.nacionalidad,
                        celular: s.celular,
                        mail: s.mail,
                        huellas: s.huellas,
                        procedencia: s.procedencia,
                        idEstado: s.idEstado,
                        crc32Foto: s.crc32Foto
                    };
                    return item;
                });

                resolve(res);
            } catch (err) {
                reject(err);
            }
        });
    }


    public Exist(numSocio: number, ultimaModificacion: Date): Promise<boolean> {

        const ultimaModificacion_epoch: number = DateFunctions.getDateEpoch(ultimaModificacion);

        return new Promise<boolean>(async (resolve, reject) => {

            try {

                initModels(sequelize);
                const where = {
                    // ultimaModificacion_epoch: {

                    //     [Op.gte]: ultimaModificacion_epoch,
                    // },
                    numSocio: {

                        [Op.eq]: numSocio,
                    }
                }
                const count = await Socios.count({ where });

                const exist = count > 0;


                resolve(exist);
            } catch (err) {
                reject(err);
            }
        });
    }
}
