import { NextFunction, Request, Response } from "express";
import { HttpException } from "../../utils/exception";
import { Table, Menu } from "../../models";
import { ITable } from "../../interfaces";
/*
{

}
*/

export const searchTable = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { tableNumber } = req.body;
    if (tableNumber) {
      const table: ITable = await Table.findOne({ tableNumber: tableNumber }).populate("orders");
      if (!table) return next(new HttpException(400, "NO_TABLE"));

      return res.json({ code: 200, table: table });
    }

    const tables: ITable[] = await Table.find().sort({ tableNumber: 1 });
    return res.json({ code: 200, tables: tables });
  } catch (err) {
    console.log(err);
    return next(new HttpException(400, "BAD_REQUEST"));
  }
};
