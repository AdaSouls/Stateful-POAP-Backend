import { config, logger } from "../config";
import { sequelize } from "./connection";
import { Umzug, SequelizeStorage } from "umzug";

export const umzug = new Umzug({
  migrations: { glob: "src/database/migrations/*.js" },
  context: sequelize.getQueryInterface(),

  // we want to customise where the meta table ends up
  // see: https://github.com/sequelize/umzug/blob/586675894c3b099bb50ad2f07e46d89277ee29bb/src/storage/sequelize.ts
  storage: new SequelizeStorage({
    sequelize,
    tableName: "sequelize_meta",
    schema: config.postgresql.schema,
    timestamps: true,
  }),

  logger: console,
  create: {
    folder: "src/database/migrations",
  },
});

/**
 * An async function to instigate formal (well-defined) db migrations.
 */
export async function formalDbMigrations() {
  try {
    logger.info("DB MIGRATIONS");

    logger.info("...calc pending");
    let resp = await umzug.pending();
    if (!resp || resp.length === 0) {
      logger.info("....NO MIGRATIONS!");
    } else {
      logger.info(`...${resp.length} pending`, resp);
      if (config.db.migrations === "all") {
        logger.info("....perform migrations now");
        resp = await umzug.up();
        logger.info("....done", resp);
      }
    }

    logger.info("....MIGRATIONS OVER");
  } catch (e) {
    if (e instanceof Error) {
      logger.error(new Error(e.message));
    } else {
      logger.error(new Error(String(e)));
    }
    return Promise.reject(e);
  }
}

/**
 * An async function to do basic model syncing (i.e. creating tables
 * that don't exist at all, but NOT doing any micro-migrations
 * as we will do that formally via umzug).
 */
export async function basicDbSync() {
  try {
    logger.info(`POSTGRES DB INIT (basic model sync): ${config.db.sync}`);
    if (config.db.sync === "all") {
      await sequelize.sync({ alter: true, logging: console.log });
    } else if (config.db.sync === "table") {
      // await sequelize.sync({ alter: false, logging: console.log });
      await sequelize.sync({ force: true, logging: console.log });
    }
    logger.info("...POSTGRES SYNC DONE");
  } catch (e) {
    if (e instanceof Error) {
      logger.error(new Error(e.message));
    } else {
      logger.error(new Error(String(e)));
    }
    return Promise.reject(e);
  }
}

/**
 * If we are running as a top-level module, run the umzug CLI.
 */
if (require.main === module) {
  umzug.runAsCLI();
}
