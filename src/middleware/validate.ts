import Joi from "joi";
import httpStatus from "http-status";
import { ApiError } from "../util/ApiError";
import { NextFunction, Request, Response } from "express";
import { pick } from "../util/pick";

export const validate =
  (schema: any, allowUnknown = true) =>
  (req: Request, res: Response, next: NextFunction) => {
    const validSchema: any = pick(schema, ["params", "query", "body"]);
    const object: any = pick(req, Object.keys(validSchema));

    const { value, error } = Joi.compile(validSchema)
      .prefs({
        allowUnknown,
        errors: {
          label: "key",
        },
        abortEarly: false,
      })
      .validate(object);

    if (error) {
      const errorMessage = error.details
        .map((details) => details.message)
        .join(", ");
      return next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
    }

    Object.assign(req, value);
    return next();
  };
