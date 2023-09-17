import { Request, Response, NextFunction } from "express";
import * as JWT from "jsonwebtoken";
import config from "../utils/config";
import { HttpException } from "../utils/exception";

export const InjectionPreventor = (req: Request, res: Response, next: NextFunction) => {
  try {
    req.body = filter(req.body);
    next();
  } catch (err) {
    console.log(err);
    return next(new HttpException(400, "BAD_REQUEST"));
  }
};

const filter = (v) => {
  if (v instanceof Object) {
    for (var key in v) {
      if (/^\$/.test(key)) {
        delete v[key];
      } else {
        filter(v[key]);
      }
    }
  }
  return v;
};
