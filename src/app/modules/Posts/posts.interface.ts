import { Schema } from "mongoose";

export interface IPost {
  _id: string;
  author: typeof Schema.ObjectId;
  title: string;
  content: string;
  category: 'Tip' | 'Story';
  imageUrls?: string[];
  isPremium: boolean;
  createdAt: Date;
  updatedAt: Date;
  status: 'publish' | 'unpublish'
  voteCount: {
    upvotes: number;
    downvotes: number;
  };
}
