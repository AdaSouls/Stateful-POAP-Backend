import { Model, DataTypes } from "sequelize";
import { sequelize } from "../database/connection";

export default class Owner extends Model {}

Owner.init(
  {
    ownerUuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
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
    sequelize,
  }
);
