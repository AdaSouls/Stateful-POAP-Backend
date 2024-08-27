import { formalDbMigrations, basicDbSync } from "./database/migrator";
import app from "./app";
import { config } from "./config/config";
import { logger } from "./config/logger";
import { sequelize } from "./database/connection";

let server: any;

/*
|--------------------------------------------------------------------------
| Error handling.
|--------------------------------------------------------------------------
*/

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info("Server closed");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error: any) => {
  logger.error(error);
  exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGTERM", () => {
  logger.info("SIGTERM received");
  if (server) {
    server.close();
  }
});

/*
|--------------------------------------------------------------------------
| Bootstrap. Migrations followed by basic db connection, then fire up the
| server, and do other post-bootup initialising.
|--------------------------------------------------------------------------
*/

formalDbMigrations()
  .then(() => {
    basicDbSync()
      .then(() => {
        logger.info("Fully Connected to PostgreSQL");
        server = app.listen(config.port, () => {
          logger.info(`Listening to port ${config.port}`);
        });
      })
      .catch((error: any) => {
        exitHandler();
      });
  })
  .catch((error: any) => {
    exitHandler();
  });
