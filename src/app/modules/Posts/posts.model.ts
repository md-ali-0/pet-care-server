import { model, Schema } from "mongoose";
import { IPost } from "./posts.interface";

const voteSchema = new Schema({
    upvotes: {
        type: Number,
        default: 0
    },
    downvotes: {
        type: Number,
        default: 0
    },
},{
    _id: false,
    versionKey: false
})

const postSchema = new Schema<IPost>({
    author: {
        type: Schema.ObjectId,
        required: true,
        ref: 'User'
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ['Tip', "Story"],
        required: true
    },
    imageUrls: {
        type: [String],
    },
    status: {
        type: String,
        enum: ['publish', "unpublish"],
        required: true,
        default: 'publish'
    },
    isPremium: {
        type: Boolean,
        required: true,
        default: false
    },
    voteCount: voteSchema

}, {
    timestamps: true,
    versionKey: false
})

export const Post = model<IPost>('Post', postSchema)