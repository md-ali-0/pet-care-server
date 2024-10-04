import { Schema } from "mongoose";

export interface IComment {
  _id: string;
  author: typeof Schema.ObjectId;
  post: typeof Schema.ObjectId;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
}
