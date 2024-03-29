import httpStatus from "http-status";
import { ApiError } from "../util/ApiError";
import { NextFunction, Request, Response } from "express";

export const checkAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    return next();
  }

  throw new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate');
};
