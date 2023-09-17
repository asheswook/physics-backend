import { ITable } from "../interfaces";
import { ObjectId } from "mongodb";
import { model, Model, Schema } from "mongoose";

const TabelSchema: Schema = new Schema({
  tableNumber: { type: Number, required: true },
  orders: [{ type: ObjectId, ref: "Order", required: false }],
  amountDue: { type: Number, required: true },
});

export const Table: Model<ITable> = model<ITable>("Table", TabelSchema);
