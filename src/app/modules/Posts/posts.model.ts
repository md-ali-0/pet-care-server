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
    authorId: {
        type: Schema.ObjectId,
        required: true
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