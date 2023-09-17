import { IOrder } from "../interfaces";
import { ObjectId } from "mongodb";
import { model, Model, Schema } from "mongoose";

const OrderSchema: Schema = new Schema({
  orderNumber: { type: Number, required: true },
  tableNumber: { type: Number, required: true },
  menu: { type: ObjectId, ref: "Menu", required: true },
  quantity: { type: Number, required: true },
  status: { type: String, required: true },
  createdAt: { type: Date, required: true },
  orderedServer: { type: String, required: true },

  isFree: { type: Boolean, required: false },
  memo: { type: String, required: false },
  forceMenu: { type: String, required: false },
  forcePrice: { type: Number, required: false },
});

export const Order: Model<IOrder> = model<IOrder>("Order", OrderSchema);
