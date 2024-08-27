import { Model, DataTypes } from "sequelize";
import { sequelize } from "../database/connection";

export default class Event extends Model {}

Event.init(
  {
    eventUuid: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    idInContract: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
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
      type: DataTypes.BOOLEAN,
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
      // type: DataTypes.ENUM,
      // values: ["Virtual", "In-Person", "Both", "Unknown"],
      // defaultValue: "Unknown",
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Unknown",
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
      // type: DataTypes.ENUM,
      // values: ["Poap", "Soulbound", "Consensual"],
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
    approved: {
      // type: DataTypes.ENUM,
      // values: ["Pending", "Approved", "Rejected"],
      type: DataTypes.STRING,
      defaultValue: "Pending",
      allowNull: false,
    },
  },
  {
    tableName: "events",
    sequelize,
  }
);
