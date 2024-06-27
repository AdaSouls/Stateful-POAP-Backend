import httpStatus from "http-status";
import { ApiError } from "../util/ApiError";
import { NextFunction, Request, Response } from "express";
import { config } from "../config";

export const checkDown = (req: Request, res: Response, next: NextFunction) => {
  if (config.appState.down && config.appState.whitelist.indexOf(req.ip) < 0) {
    throw new ApiError(
      httpStatus.SERVICE_UNAVAILABLE,
      config.appState.downMsg || "Service unavailable."
    );
  }

  return next();
};
