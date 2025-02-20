import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface SociosAttributes {
  numSocio?: number;
  documento: number;
  idAbono?: number;
  vencimientoAbono?: Date;
  contadorAbono?: number;
  sector?: string;
  seccion?: string;
  categoria: string;
  precioCategoria?: number;
  tipoSocio?: string;
  idTipoSocio?: number;
  cobrador?: string;
  nombre?: string;
  tipoDocumento?: string;
  calle?: string;
  numero?: string;
  localidad?: string;
  codigoPostal?: string;
  telefono?: string;
  tarjeta?: string;
  contadorSocio?: number;
  nacimiento?: Date;
  ingreso?: Date;
  ultimoPago?: Date;
  ultimaModificacion?: Date;
  estado?: string;
  formaDePago?: string;
  filial?: string;
  idSexo?: string;
  sexo?: string;
  provincia?: string;
  nacionalidad?: string;
  celular?: string;
  mail?: string;
  huellas?: boolean;
  procedencia?: string;
  idEstado?: number;
  ultimaModificacion_epoch: number;
}

export type SociosOptionalAttributes = "numSocio" | "idAbono" | "vencimientoAbono" | "contadorAbono" | "sector" | "seccion" | "precioCategoria" | "tipoSocio" | "idTipoSocio" | "cobrador" | "nombre" | "tipoDocumento" | "calle" | "numero" | "localidad" | "codigoPostal" | "telefono" | "tarjeta" | "contadorSocio" | "nacimiento" | "ingreso" | "ultimoPago" | "ultimaModificacion" | "estado" | "formaDePago" | "filial" | "idSexo" | "sexo" | "provincia" | "nacionalidad" | "celular" | "mail" | "huellas" | "procedencia" | "idEstado" | "ultimaModificacion_epoch";
export type SociosCreationAttributes = Optional<SociosAttributes, SociosOptionalAttributes>;

export class Socios extends Model<SociosAttributes, SociosCreationAttributes> implements SociosAttributes {
  numSocio?: number;
  documento!: number;
  idAbono?: number;
  vencimientoAbono?: Date;
  contadorAbono?: number;
  sector?: string;
  seccion?: string;
  categoria!: string;
  precioCategoria?: number;
  tipoSocio?: string;
  idTipoSocio?: number;
  cobrador?: string;
  nombre?: string;
  tipoDocumento?: string;
  calle?: string;
  numero?: string;
  localidad?: string;
  codigoPostal?: string;
  telefono?: string;
  tarjeta?: string;
  contadorSocio?: number;
  nacimiento?: Date;
  ingreso?: Date;
  ultimoPago?: Date;
  ultimaModificacion?: Date;
  estado?: string;
  formaDePago?: string;
  filial?: string;
  idSexo?: string;
  sexo?: string;
  provincia?: string;
  nacionalidad?: string;
  celular?: string;
  mail?: string;
  huellas?: boolean;
  procedencia?: string;
  idEstado?: number;
  ultimaModificacion_epoch!: number;


  static initModel(sequelize: Sequelize.Sequelize): typeof Socios {
    return Socios.init({
      numSocio: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true
      },
      documento: {
        type: DataTypes.BIGINT,
        allowNull: false
      },
      idAbono: {
        type: DataTypes.BIGINT,
        allowNull: true
      },
      vencimientoAbono: {
        type: DataTypes.DATE,
        allowNull: true
      },
      contadorAbono: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      sector: {
        type: DataTypes.STRING(100),
        allowNull: true
      },
      seccion: {
        type: DataTypes.STRING(100),
        allowNull: true
      },
      categoria: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      precioCategoria: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true
      },
      tipoSocio: {
        type: DataTypes.STRING(255),
        allowNull: true
      },
      idTipoSocio: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      cobrador: {
        type: DataTypes.STRING(50),
        allowNull: true
      },
      nombre: {
        type: DataTypes.STRING(255),
        allowNull: true
      },
      tipoDocumento: {
        type: DataTypes.STRING(4),
        allowNull: true
      },
      calle: {
        type: DataTypes.STRING(255),
        allowNull: true
      },
      numero: {
        type: DataTypes.STRING(20),
        allowNull: true
      },
      localidad: {
        type: DataTypes.STRING(155),
        allowNull: true
      },
      codigoPostal: {
        type: DataTypes.STRING(8),
        allowNull: true
      },
      telefono: {
        type: DataTypes.STRING(50),
        allowNull: true
      },
      tarjeta: {
        type: DataTypes.STRING(100),
        allowNull: true
      },
      contadorSocio: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      nacimiento: {
        type: DataTypes.DATE,
        allowNull: true
      },
      ingreso: {
        type: DataTypes.DATE,
        allowNull: true
      },
      ultimoPago: {
        type: DataTypes.DATE,
        allowNull: true
      },
      ultimaModificacion: {
        type: DataTypes.DATE,
        allowNull: true
      },
      estado: {
        type: DataTypes.STRING(20),
        allowNull: true
      },
      formaDePago: {
        type: DataTypes.STRING(50),
        allowNull: true
      },
      filial: {
        type: DataTypes.STRING(155),
        allowNull: true
      },
      idSexo: {
        type: DataTypes.CHAR(1),
        allowNull: true
      },
      sexo: {
        type: DataTypes.STRING(20),
        allowNull: true
      },
      provincia: {
        type: DataTypes.STRING(200),
        allowNull: true
      },
      nacionalidad: {
        type: DataTypes.STRING(200),
        allowNull: true
      },
      celular: {
        type: DataTypes.STRING(50),
        allowNull: true
      },
      mail: {
        type: DataTypes.STRING(155),
        allowNull: true
      },
      huellas: {
        type: DataTypes.BOOLEAN,
        allowNull: true
      },
      procedencia: {
        type: DataTypes.STRING(100),
        allowNull: true
      },
      idEstado: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
   
      ultimaModificacion_epoch: {
        type: DataTypes.BIGINT,
        allowNull: false,
        defaultValue: 0
      }
    }, {
      sequelize,
      tableName: 'Socios',
      schema: 'dbo',
      timestamps: false
    });
  }
}
