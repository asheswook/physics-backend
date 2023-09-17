import * as express from "express";
import { Request, Response } from "express";
import menu from "./menu";
import order from "./order";
import table from "./table";

const sleep = async (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
export const route = (app: express.Express): void => {
  app.use("/menu", menu);
  app.use("/order", order);
  app.use("/table", table);
};
