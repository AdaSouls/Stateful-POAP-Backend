import { config } from "./config";
import { logger } from "./logger";
import { errorHandler, successHandler } from "./morgan";

const morgan = { errorHandler, successHandler };

export { config, logger, morgan };
