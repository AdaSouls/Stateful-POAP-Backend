import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  DataTypes,
  ForeignKey,
} from "sequelize";
import { database } from "@/database/connection";

export default class Poap extends Model {}

Poap.init(
  {
    poap: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
  },
  {
    tableName: "poap",
    sequelize: database,
    // schema: config.postgresql.schema,
    // indexes: [
    //   {
    //     unique: true,
    //     fields: ["address"],
    //   },
    // ],
  }
);
