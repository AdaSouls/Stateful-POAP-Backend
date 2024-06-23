import { Model, DataTypes } from "sequelize";
import { sequelize } from "../database/connection";
import Event from "./Event";

export default class Poap extends Model {
  public addEvents!: (event: Event | number) => Promise<void>;
  public getEvents!: () => Promise<Event[]>;
  public setEvents!: (events: Event[] | number[]) => Promise<void>;
  public removeEvent!: (event: Event | number) => Promise<void>;
}

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
