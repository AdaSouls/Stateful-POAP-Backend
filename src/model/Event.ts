import {
  Model,
  DataTypes,
} from "sequelize";
import { database } from "@/database/connection";

export default class Event extends Model {}

Event.init(
  {
    eventId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      primaryKey: true,
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
      type: DataTypes.NUMBER,
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
      type: DataTypes.NUMBER,
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
      type: DataTypes.NUMBER,
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
  },
  {
    tableName: "events",
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
