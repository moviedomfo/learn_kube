import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface api_logsAttributes {
  id?: number;
  fecha: Date;
  endpoint: string;
  http_method: string;
  client_ip: string;
  user_agent?: string;
  response_code: number;
  response_time_ms: number;
  request_params?: string;
}

export type api_logsPk = "id";
export type api_logsId = api_logs[api_logsPk];
export type api_logsOptionalAttributes = "id" | "fecha" | "user_agent" | "request_params";
export type api_logsCreationAttributes = Optional<api_logsAttributes, api_logsOptionalAttributes>;

export class api_logs extends Model<api_logsAttributes, api_logsCreationAttributes> implements api_logsAttributes {
  id!: number;
  fecha!: Date;
  endpoint!: string;
  http_method!: string;
  client_ip!: string;
  user_agent?: string;
  response_code!: number;
  response_time_ms!: number;
  request_params?: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof api_logs {
    return api_logs.init({
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('getdate')
    },
    endpoint: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    http_method: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    client_ip: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    user_agent: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    response_code: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    response_time_ms: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    request_params: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'api_logs',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__api_logs__3213E83FAEADA348",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
