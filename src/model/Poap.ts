import { Model, DataTypes } from "sequelize";
import { sequelize } from "../database/connection";

export default class Poap extends Model {}

Poap.init(
  {
    poapUuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    instance: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "poaps",
    sequelize,
  }
);
