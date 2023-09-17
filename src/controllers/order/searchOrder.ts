import { NextFunction, Request, Response } from "express";
import { HttpException } from "../../utils/exception";
import { Order } from "../../models";
import { IOrder } from "../../interfaces";
/*
{
}
*/

export const searchOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { tableNumber, orderNumber, noCur } = req.body;

    const mongoQuery: any = {};
    if (tableNumber) mongoQuery.tableNumber = tableNumber;
    if (orderNumber) mongoQuery.orderNumber = orderNumber;

    if (noCur) {
      const orders: IOrder[] = await Order.find(mongoQuery).populate("menu").sort({ createdAt: -1 });
      if (!orders) return next(new HttpException(400, "NO_ORDER"));

      return res.json({ code: 200, orders: orders });
    }

    const endOrders: IOrder[] = await Order.find(Object.assign({}, mongoQuery, { status: { $in: ["SERVED", "COOKED"] } }))
      .populate("menu")
      .sort({ createdAt: -1 });
    const curOrders: IOrder[] = await Order.find(Object.assign({}, mongoQuery, { status: { $in: ["COOKING", "ORDERED"] } }))
      .populate("menu")
      .sort({ createdAt: -1 });
    if (!endOrders || !curOrders) return next(new HttpException(400, "NO_ORDER"));

    return res.json({ code: 200, endOrders: endOrders, curOrders: curOrders });
  } catch (err) {
    console.log(err);
    return next(new HttpException(400, "BAD_REQUEST"));
  }
};
