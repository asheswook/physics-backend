import { Document, Types } from "mongoose";

export interface IMenu extends Document {
  name: string;
  price: number;
}
