import { NextFunction, Request, Response } from "express";
import { HttpException } from "../../utils/exception";
import { Menu, Order, Table } from "../../models";
import { IOrder, IMenu, ITable } from "../../interfaces";
/*
const OrderSchema: Schema = new Schema({
  tableNumber: { type: Number, required: true },
  menu: { type: ObjectId, ref: "Menu", required: true },
  quantity: { type: Number, required: true },
  status: { type: String, required: true },
  createdAt: { type: String, required: true },
  orderedServer: { type: String, required: true },

  isFree: { type: Boolean, required: false },
  memo: { type: String, required: false },
  forceMenu: { type: String, required: false },
  forcePrice: { type: Number, required: false },
});
}
*/

export const orderMenu = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const query: IOrder = req.body;
    if (!query.tableNumber || !query.menu || !query.quantity || !query.orderedServer) return next(new HttpException(400, "BAD_REQUEST"));

    const menu: IMenu = await Menu.findOne({ name: query.menu });
    if (!menu) return next(new HttpException(400, "NO_MENU"));

    let table: ITable = await Table.findOne({ tableNumber: query.tableNumber });
    if (!table) {
      // 테이블 없으면 생성
      table = await Table.create({
        tableNumber: query.tableNumber,
        orders: [],
        amountDue: 0,
      });
    }

    const curOrder: any = {};

    curOrder.tableNumber = query.tableNumber;
    curOrder.menu = menu._id;
    curOrder.quantity = query.quantity;
    curOrder.status = "ORDERED";
    curOrder.createdAt = new Date();
    curOrder.orderedServer = query.orderedServer;

    if (query?.isFree) curOrder.isFree = query.isFree || false;
    if (query?.memo) curOrder.memo = query.memo || "";
    if (query?.forceMenu) curOrder.forceMenu = query.forceMenu || "";
    if (query?.forcePrice) curOrder.forcePrice = query.forcePrice || 0;

    const orderCount = await Order.countDocuments();
    curOrder.orderNumber = orderCount + 1;

    const ordered = await Order.create(curOrder);

    table.orders.push(ordered._id);
    table.amountDue += menu.price * query.quantity;
    await table.save();

    res.json({ code: 200 });
  } catch (err) {
    console.log(err);
    return next(new HttpException(400, "INTERVAL"));
  }
};
