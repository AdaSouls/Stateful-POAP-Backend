import express from "express";
import poapRouter from "./poap.route";
import { config } from "../../config";

const router = express.Router();

const defaultRoutes = [
  {
    path: "/poap",
    route: poapRouter,
  },
];

const devRoutes: any[] = [
  // routes available only in development mode
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env !== "production") {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

export default router;
