import { model, Schema } from "mongoose";
import { IPayment } from "./payment.interface";


const paymentSchema = new Schema<IPayment>({
    user: {
        type: Schema.ObjectId,
        required: true,
        ref: 'User'
    },
    currency: {
        type: String,
        required: true,
    },
    payment_method: {
        type: String,
        required: true,
    },
    transectionId: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
    versionKey: false
})

export const Payment = model<IPayment>('Payment', paymentSchema)