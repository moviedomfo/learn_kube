import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface ReportsAttributes {
  Id?: number;
  fecha: Date;
  numSocio: number;
  fechaModif: Date;
  action: string;
}

export type ReportsPk = "Id";
export type ReportsId = Reports[ReportsPk];
export type ReportsOptionalAttributes = "Id";
export type ReportsCreationAttributes = Optional<ReportsAttributes, ReportsOptionalAttributes>;

export class Reports extends Model<ReportsAttributes, ReportsCreationAttributes> implements ReportsAttributes {
  Id!: number;
  fecha!: Date;
  numSocio!: number;
  fechaModif!: Date;
  action!: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof Reports {
    return Reports.init({
    Id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: false
    },
    numSocio: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    fechaModif: {
      type: DataTypes.DATE,
      allowNull: false
    },
    action: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Reports',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_Reports",
        unique: true,
        fields: [
          { name: "Id" },
        ]
      },
    ]
  });
  }
}
