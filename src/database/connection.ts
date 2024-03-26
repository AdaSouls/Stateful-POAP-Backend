import path from "path";
import { Sequelize } from "sequelize";
const dotenv = require("dotenv");
const {
  POSTGRESQL_URL,
  POSTGRESQL_USER,
  POSTGRESQL_DB_NAME,
  POSTGRESQL_PASSWORD,
} = process.env;

dotenv.config({ path: path.join(__dirname, "../../.env") });

export let database: Sequelize;

if (POSTGRESQL_URL) {
  console.log("POSTGRES connection: ", POSTGRESQL_URL);
  database = new Sequelize(POSTGRESQL_URL, {
    // logging: false,
    // native: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  });
} else if (POSTGRESQL_DB_NAME && POSTGRESQL_USER && POSTGRESQL_PASSWORD) {
  database = new Sequelize(
    POSTGRESQL_DB_NAME,
    POSTGRESQL_USER,
    POSTGRESQL_PASSWORD,
    {
      dialect: "postgres",
    }
  );
}