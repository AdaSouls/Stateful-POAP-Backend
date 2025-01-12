import httpStatus from "http-status";
import { ApiError } from "../util/ApiError";
import { NextFunction, Request, Response } from "express";
import { config } from "../config";
import { logger } from "../config/logger";

export const errorConverter = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let error = err;
  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode
      ? httpStatus.BAD_REQUEST
      : httpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || httpStatus[statusCode];
    error = new ApiError(statusCode, message, false, err.stack);
  }
  next(error);
};

// eslint-disable-next-line no-unused-vars
export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let { statusCode, message } = err;
  if (config.env === "production" && !err.isOperational) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
  }

  res.locals.errorMessage = err.message;

  const response = {
    code: statusCode,
    message,
    ...((config.errorHandling.alwaysStackTrace ||
      config.env !== "production") &&
      statusCode !== httpStatus.SERVICE_UNAVAILABLE && { stack: err.stack }),
  };

  logger.error(err);

  res.status(statusCode).send(response);
};
