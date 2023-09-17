import { NextFunction, Request, Response } from "express";
import { HttpException } from "../../utils/exception";
import { Menu } from "../../models";
import { ITable } from "../../interfaces";
/*
{
    "tableNumber": "메뉴 이름",
    "order": "추가할 메뉴 oid",
    "amountDue": "가격 강제 수정"
    "remove": boolean // Optional
}
*/

export const modifyTable = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { tableNumber, orders, amountDue, remove }: ITable = req.body;
    if (!tableNumber) return next(new HttpException(400, "BAD_REQUEST"));

    const table: ITable = await Menu.findOne({ tableNumber: tableNumber });
    if (!table) return next(new HttpException(400, "NO_TABLE"));

    if (remove) await table.remove();
    if (amountDue) table.amountDue = amountDue;
    if (orders) {
      const menu = await Menu.findOne({ _id: orders });
      if (!menu) return next(new HttpException(400, "NO_MENU"));

      table.orders.push(menu._id);
    }

    await table.save();

    res.json({ code: 200 });
  } catch (err) {
    console.log(err);
    return next(new HttpException(400, "BAD_REQUEST"));
  }
};
