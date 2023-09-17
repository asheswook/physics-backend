import { NextFunction, Request, Response } from "express";
import { HttpException } from "../utils/exception";

const sendError = (res: Response, status: number, message: string) => {
  res.json({ code: status, msg: message });
};

export const errorHandler = (err: HttpException, req: Request, res: Response, next: NextFunction) => {
  switch (err.name) {
    case "HttpException": {
      const { status, message } = err as HttpException;
      sendError(res, status, message);
      break;
    }
    default: {
      console.log(err);
      sendError(res, 400, "BAD_REQUEST");
      break;
    }
  }
};
