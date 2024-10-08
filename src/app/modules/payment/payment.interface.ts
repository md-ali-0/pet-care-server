import { Schema } from "mongoose";

export interface IPayment {
  _id: string;
  user: typeof Schema.ObjectId;
  transectionId: string;
  currency: string;
  payment_method: string
  createdAt: Date;
  updatedAt: Date;
}
