import {
  Model,
  DataTypes,
} from "sequelize";
import { sequelize } from "../database/connection";

export default class Poap extends Model {}

Poap.init(
  {
    poap: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    instance: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
  },
  {
    tableName: "poaps",
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
