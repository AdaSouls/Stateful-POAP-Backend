// const Sequelize = require('sequelize');
// const config = require('../config/config');
import path from "path";
import { Sequelize } from "sequelize";
const dotenv = require("dotenv");
const { POSTGRESQL_URL } = process.env;

dotenv.config({ path: path.join(__dirname, "../../.env") });

export let database: Sequelize;

if (POSTGRESQL_URL) {
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
}

// let sequelize;

// if (config.postgresql.url) {
//   console.log('POSTGRES connection: ', config.postgresql.url);
//   sequelize = new Sequelize(config.postgresql.url, {
//     dialectOptions: {
//       ssl: {
//         require: true,
//         rejectUnauthorized: false,
//       }
//     }
//   });
// } else {
//   sequelize = new Sequelize(
//     config.postgresql.database,
//     config.postgresql.user,
//     config.postgresql.password,
//     {
//       dialect: 'postgres',
//     }
//   );
// }

// module.exports = {
//   sequelize,
//   Sequelize,
// };
