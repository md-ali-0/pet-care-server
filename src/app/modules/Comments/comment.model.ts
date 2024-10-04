import { model, Schema } from "mongoose";
import { IComment } from "./comment.interface";


const commmentSchema = new Schema<IComment>({
    author: {
        type: Schema.ObjectId,
        required: true,
        ref: 'User'
    },
    post: {
        type: Schema.ObjectId,
        required: true,
        ref: 'Post'
    },
    comment: {
        type: String,
        required: true
    }

}, {
    timestamps: true,
    versionKey: false
})

export const Comment = model<IComment>('Commment', commmentSchema)