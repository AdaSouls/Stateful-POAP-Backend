import { Model, DataTypes } from "sequelize";
import { sequelize } from "../database/connection";
import Poap from "./Poap";

export default class Event extends Model {
  public addPoaps!: (poap: Poap | number) => Promise<void>;
  public getPoaps!: () => Promise<Poap[]>;
  public setPoaps!: (poaps: Poap[] | number[]) => Promise<void>;
  public removePoap!: (poap: Poap | number) => Promise<void>;
}

Event.init(
  {
    eventUuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    idInContract: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    expiryDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    eventUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    virtualEvent: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    secretCode: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    eventTemplateId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    requestedCodes: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    privateEvent: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    purpose: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    platform: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    eventType: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    amountOfAttendees: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    account: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    poapType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    poapsToBeMinted: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    mintedPoaps: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "events",
    sequelize,
  }
);
