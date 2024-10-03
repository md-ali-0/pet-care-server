import { Schema } from "mongoose";

export interface IPost {
  _id: string;
  authorId: typeof Schema.ObjectId;
  title: string;
  content: string;
  category: 'Tip' | 'Story';
  imageUrls?: string[];
  isPremium: boolean;
  createdAt: Date;
  updatedAt: Date;
  voteCount: {
    upvotes: number;
    downvotes: number;
  };
}
