import {
  Model,
  DataTypes
} from "sequelize";
import { sequelize } from "../database/connection";

export default class Owner extends Model {}

Owner.init(
  {
    uuid: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
  },
  {
    tableName: "owners",
    sequelize
    // schema: config.postgresql.schema,
    // indexes: [
    //   {
    //     unique: true,
    //     fields: ["address"],
    //   },
    // ],
  }
);
