import { Model, DataTypes } from "sequelize";
import { sequelize } from "../database/connection";

export default class EventPoap extends Model {}

EventPoap.init(
  {
    relationUuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true,
    },
    poapUuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    eventUuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
  },
  {
    tableName: "eventPoaps",
    sequelize,
  }
);
