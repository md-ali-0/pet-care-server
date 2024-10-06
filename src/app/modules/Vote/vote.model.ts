import { model, Schema } from "mongoose";
import { IVote } from "./vote.interface";


const voteSchema = new Schema<IVote>({
    user: {
        type: Schema.ObjectId,
        required: true,
        ref: 'User'
    },
    post: {
        type: Schema.ObjectId,
        required: true,
        ref: 'Post'
    },
    type: {
        type: String,
        enum: ['upvote', 'downvote'],
        required: true
    }
}, {
    timestamps: true,
    versionKey: false
})

export const Vote = model<IVote>('Vote', voteSchema)