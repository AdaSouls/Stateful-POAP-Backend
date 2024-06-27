import express, { Application } from "express";
import { Request, Response, NextFunction } from "express";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import httpStatus from "http-status";
import { config } from "./config/config";
import * as morgan from "./config/morgan";
import router from "./route/v1";
import { checkDown } from "./middleware/down";
import { errorConverter, errorHandler } from "./middleware/error";
import { ApiError } from "./util/ApiError";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./config/swagger.json";

const app = express();

// morgan logger
if (config.env !== "test") {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
// app.use(xss());

// gzip compression
app.use(compression());

// enable cors
// if (config.frontendUrl2 || config.frontendUrl3 || config.frontendUrl4) {
//   app.use(
//     cors({
//       credentials: true,
//       origin: [
//         config.frontendUrl,
//         config.frontendUrl2 || "",
//         config.frontendUrl3 || "",
//         config.frontendUrl4 || "",
//       ],
//     })
//   );
// } else {
//   app.use(cors({ credentials: true, origin: config.frontendUrl }));
// }
app.options("*", cors());

// see "Troubleshooting Proxy" section here https://www.npmjs.com/package/express-rate-limit
app.set("trust proxy", 2);
app.get("/ip45v", (request: Request, response: Response) =>
  response.send({ ip: request.ip, trustLevel: 2 })
); // a helper route to calc the correct value for "trust proxy"

// check if app is currently down
app.use(checkDown);

// cookie parser
app.use(cookieParser());

// v1 api routes
app.use("/v1", router); // Pass the express application instance to the router module

// send back a 404 error for any unknown api request
app.use((req: Request, res: Response, next: NextFunction) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

export default app;
