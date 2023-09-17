import { IMenu } from "../interfaces";
import { ObjectId } from "mongodb";
import { model, Model, Schema } from "mongoose";

const MenuSchema: Schema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
});

export const Menu: Model<IMenu> = model<IMenu>("Menu", MenuSchema);
