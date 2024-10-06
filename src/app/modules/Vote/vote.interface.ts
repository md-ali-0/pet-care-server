import { Schema } from "mongoose";

export interface IVote {
  _id: string;
  user: typeof Schema.ObjectId;
  post: typeof Schema.ObjectId;
  type: 'upvote' | 'downvote';
  createdAt: Date;
  updatedAt: Date;
}
