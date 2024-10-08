import httpStatus from "http-status";
import Stripe from "stripe";
import config from "../../config";
import AppError from "../../errors/AppError";
import { User } from "../User/user.model";
import { IPayment } from "./payment.interface";
import { Payment } from "./payment.model";

const createPaymentIntent = async (payload: { amount: number; currency: string; }) => {
    const { amount, currency } = payload;

    const stripe = new Stripe(config.stripe_secret as string, {
        apiVersion: '2024-09-30.acacia',
    });

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100,
            currency: currency,
        });
        return paymentIntent.client_secret
    } catch (error) {
        throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, 'Faild to create payment intent')
    }
};

const createPayment = async(payload: IPayment) =>{
    const updateUser = await User.findByIdAndUpdate(payload.user, {isPremium: true, premiumExpireDate: new Date()})
    const payment = await Payment.create(payload)
    return payment
} 

export const PaymentService = {
    createPaymentIntent,
    createPayment
};
