import { Model, DataTypes } from "sequelize";
import { sequelize } from "../database/connection";
import Event from "./Event";

export default class Poap extends Model {
  async addEvent(event: Event) {
    if (!(event instanceof Event)) {
      throw new Error("Parameter must be an instance of Event");
    }
    await this.addEvent(event);
    return this;
  }
  async removeEvent(event: Event) {
    if (!(event instanceof Event)) {
      throw new Error("Parameter must be an instance of Event");
    }
    await this.removeEvent(event);
    return this;
  }
}

Poap.init(
  {
    uuid: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    // poap: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    // },
    instance: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
  },
  {
    tableName: "poaps",
    sequelize,
    // schema: config.postgresql.schema,
    // indexes: [
    //   {
    //     unique: true,
    //     fields: ["address"],
    //   },
    // ],
  }
);
