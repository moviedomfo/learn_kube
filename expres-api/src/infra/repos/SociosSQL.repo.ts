
import sequelize from "../db/Sequelize-sql-db";
import { Op, where } from "sequelize";
import { ISociosRepository } from "@app/interfases/ISociosRepository";
import { GetSocioByIdRes } from "@app/DTOs/Socios/GetSociosByIdISVC";
import { SearchSociosRes } from "@app/DTOs/Socios/SearchSociosISVC";
import { SociosDE } from "@domain/Entities/SociosDE";
import { Socios, SociosAttributes, initModels } from "@infra/db/init-models";
import { SearchSimpleViewSociosRes, SocioSimpleViewDTO } from "@app/DTOs/Socios/SearchSimpleViewSociosISVC";
import { DateFunctions } from "@common/helpers/dateFunctions";

/**Persist to sql Socios */
export default class SociosRepository implements ISociosRepository {

  /**
   * 
   * @param id  numSocio 
   * 
   * @returns Retrive socio by id
   */
  public Get(id: number): Promise<GetSocioByIdRes> {

    const res: GetSocioByIdRes = new GetSocioByIdRes();
    return new Promise<GetSocioByIdRes>(async (resolve, reject) => {
      try {
        initModels(sequelize);

        const socioFromDB = await Socios.findByPk(id);
        if (socioFromDB != null) {
          const socio = mapSocio(socioFromDB)

          res.socio = socio;
        }
        resolve(res);
      } catch (error) {
        reject(error);
      }
    });
  }


  /**
   * Busca lista completa de socios a partir de una fecha de ultimaModificacion
   * @param startDate 
   * @param offset 
   * @param limit 
   * @returns 
   */
  public async Search(startDate: Date, offset?: number, limit?: number): Promise<SearchSociosRes> {
    const ultimaModificacion_epoch: number = DateFunctions.getDateEpoch(startDate);
    // const where = {
    //   ultimaModificacion_epoch: {
    //     [Op.gte]: ultimaModificacion_epoch,
    //   }
    // }
  
    const where = {
      ultimaModificacion: {
        [Op.gt]: startDate,
      },

    };

    return new Promise<SearchSociosRes>(async (resolve, reject) => {
      const res: SearchSociosRes = new SearchSociosRes();
      try {
        initModels(sequelize);

        const { count, rows } = await Socios.findAndCountAll({
          where,
          order: [['ultimaModificacion', 'ASC']],
          offset,
          limit,
        });

        const sociosList = rows.map(p => mapSocio(p));

        res.socios = sociosList;
        res.count = sociosList.length;
        res.total_count = count;
        resolve(res);
      } catch (err) {
        reject(err);
      }
    });
  }

  /**
   * Obtiene una lista simple de socios a partir de una fecha de modificacion 
   * @param startDate 
   * @param offset 
   * @param limit 
   * @returns 
   */
  public async SearchSimpleView(startDate: Date, offset?: number, limit?: number): Promise<SearchSimpleViewSociosRes> {
    // const ultimaModificacion_epoch: number = DateFunctions.getDateEpoch(startDate);

    // const where = {
    //   ultimaModificacion_epoch: {
    //     [Op.gte]: ultimaModificacion_epoch,
    //   }
    // }
    const where = {
      ultimaModificacion: {
        [Op.gt]: startDate,
      },

    };

    return new Promise<SearchSimpleViewSociosRes>(async (resolve, reject) => {
      const res: SearchSimpleViewSociosRes = new SearchSimpleViewSociosRes();
      try {
        initModels(sequelize);

        const { count, rows } = await Socios.findAndCountAll({
          where,
          attributes: ['numSocio', 'documento', 'ultimaModificacion', 'ultimaModificacion_epoch'],
          offset,
          limit,
          order: [['ultimaModificacion_epoch', 'ASC']]
        });

        const sociosList = rows.map(p => mapSocioSimple(p));

        res.socios = sociosList;
        res.count = sociosList.length;
        res.total_count = count;
        resolve(res);
      } catch (err) {
        reject(err);
      }
    });
  }

  /**
   * 
   * @param numSocio 
   * @param ultimaModificacion 
   * @returns 
   */
  public Exist(numSocio: number, ultimaModificacion: Date): Promise<SocioSimpleViewDTO | null> {

    const ultimaModificacion_epoch: number = DateFunctions.getDateEpoch(ultimaModificacion);
    return new Promise<SocioSimpleViewDTO>(async (resolve, reject) => {

      try {

        initModels(sequelize);
        const where = {
          ultimaModificacion_epoch: {

            [Op.eq]: ultimaModificacion_epoch,
          },
          numSocio: {

            [Op.eq]: numSocio,
          }
        }
        const socio = await Socios.findOne({ where });

        if (!socio)
          return resolve(null);

        const res = {

          ultimaModificacion_epoch: socio.ultimaModificacion_epoch,
          numSocio: socio.numSocio,
          documento: socio.documento,
          ultimaModificacion: socio.ultimaModificacion,
          ultimaModificacion_tz: ''
        }

        resolve(res);

      } catch (err) {
        reject(err);
      }
    });
  }
}

export const mapSocioSimple = (socioFromDB: SociosAttributes): SocioSimpleViewDTO => {
  const socio: SocioSimpleViewDTO = {

    documento: socioFromDB.documento,
    numSocio: socioFromDB.numSocio,
    ultimaModificacion: socioFromDB.ultimaModificacion,

    ultimaModificacion_epoch: socioFromDB.ultimaModificacion_epoch,
    ultimaModificacion_tz: '',
  };

  return socio;
}

export const mapSocio = (socioFromDB: SociosAttributes): SociosDE => {
  const socio: SociosDE = {

    documento: socioFromDB.documento,
    idAbono: socioFromDB.idAbono,
    contadorAbono: socioFromDB.contadorAbono,
    sector: socioFromDB.sector,
    seccion: socioFromDB.seccion,
    categoria: socioFromDB.categoria,
    precioCategoria: socioFromDB.precioCategoria,
    tipoSocio: socioFromDB.tipoSocio,
    idTipoSocio: socioFromDB.idTipoSocio,
    cobrador: socioFromDB.cobrador,
    nombre: socioFromDB.nombre,
    tipoDocumento: socioFromDB.tipoDocumento,
    calle: socioFromDB.calle,
    numero: socioFromDB.numero,
    localidad: socioFromDB.localidad,
    codigoPostal: socioFromDB.codigoPostal,
    telefono: socioFromDB.telefono,
    tarjeta: socioFromDB.tarjeta,
    contadorSocio: socioFromDB.contadorSocio,
    numSocio: socioFromDB.numSocio,
    vencimientoAbono: socioFromDB.vencimientoAbono,
    ingreso: socioFromDB.ingreso,
    nacimiento: socioFromDB.nacimiento,
    ultimoPago: socioFromDB.ultimoPago,
    ultimaModificacion: socioFromDB.ultimaModificacion,
    estado: socioFromDB.estado,
    formaDePago: socioFromDB.formaDePago,
    filial: socioFromDB.filial,
    idSexo: socioFromDB.idSexo,
    sexo: socioFromDB.sexo,
    provincia: socioFromDB.provincia,
    nacionalidad: socioFromDB.nacionalidad,
    celular: socioFromDB.celular,
    mail: socioFromDB.mail,
    huellas: socioFromDB.huellas,
    procedencia: socioFromDB.procedencia,
    idEstado: socioFromDB.idEstado,

  };

  return socio;
}
