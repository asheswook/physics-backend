import { NextFunction, Request, Response } from "express";
import { HttpException } from "../../utils/exception";
import { Menu, Order } from "../../models";
import { IMenu, IOrder } from "../../interfaces";

export const modifyOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { orderNumber, status, memo, isFree } = req.body;
    if (!orderNumber) return next(new HttpException(400, "BAD_REQUEST"));

    const order: IOrder = await Order.findOne({ orderNumber: orderNumber });
    if (!order) return next(new HttpException(400, "NO_ORDER"));

    if (status) order.status = status;
    if (memo) order.memo = memo;
    if (isFree) order.isFree = isFree;

    await order.save();

    res.json({ code: 200 });
  } catch (err) {
    console.log(err);
    return next(new HttpException(400, "BAD_REQUEST"));
  }
};
