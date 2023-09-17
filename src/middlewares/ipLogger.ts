import { Request, Response, NextFunction } from "express";
import * as JWT from "jsonwebtoken";
import config from "../utils/config";
import { HttpException } from "../utils/exception";

export const ipLogger = (req: Request, res: Response, next: NextFunction) => {
  try {
    let ip = req.headers["cf-connecting-ip"];
    if (!ip || ip == undefined || ip == null) ip = "undefined";
    req.ipaddr = ip.toString();
    next();
  } catch (err) {
    console.log(err);
    return next(new HttpException(400, "BAD_REQUEST"));
  }
};
