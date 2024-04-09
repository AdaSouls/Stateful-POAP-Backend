import path from "path";
import { Sequelize } from "sequelize";
import dotenv from "dotenv";
const {
  POSTGRESQL_URL,
  POSTGRESQL_USER,
  POSTGRESQL_DB_NAME,
  POSTGRESQL_PASSWORD,
} = process.env;

dotenv.config({ path: path.join(__dirname, "../../.env") });

let sequelize: Sequelize;

if (POSTGRESQL_URL) {
  console.log("POSTGRES connection: ", POSTGRESQL_URL);
  sequelize = new Sequelize(POSTGRESQL_URL, {
    logging: false,
    native: false,
    dialectOptions: {
      ssl: false
      // ssl: {
      //   require: false,
      //   rejectUnauthorized: false,
      // },
    },
  });
} else if (POSTGRESQL_DB_NAME && POSTGRESQL_USER && POSTGRESQL_PASSWORD) {
  sequelize = new Sequelize(
    POSTGRESQL_DB_NAME,
    POSTGRESQL_USER,
    POSTGRESQL_PASSWORD,
    {
      dialect: "postgres",
    }
  );
}

export { sequelize };
