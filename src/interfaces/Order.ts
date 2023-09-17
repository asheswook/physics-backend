import { Document, Types } from "mongoose";
import { OrderType } from "../utils/types";

export interface IOrder extends Document {
  orderNumber: number;
  tableNumber: number;
  menu: Types.ObjectId;
  quantity: number;
  memo: string;
  forceMenu: string;
  forcePrice: number;
  isFree: boolean;
  status: OrderType;
  orderedServer: string;
  createdAt: Date;
}
