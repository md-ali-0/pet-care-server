import httpStatus from "http-status";
import Stripe from "stripe";
import QueryBuilder from "../../builder/QueryBuilder";
import config from "../../config";
import AppError from "../../errors/AppError";
import { User } from "../User/user.model";
import { IPayment } from "./payment.interface";
import { Payment } from "./payment.model";

const getAllPayments = async (query: Record<string, unknown>) => {
    const PaymentQuery = new QueryBuilder(Payment.find().populate('user'), query)
      .search(['user', 'currency', 'payment_method', 'transectionId'])
      .fields()
      .paginate()
      .sort()
      .filter()
      .limit()
  
    const meta = await PaymentQuery.countTotal();
    const data = await PaymentQuery.modelQuery;
  
    return {
      meta,
      data,
  };
  };

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

const deletePayment = async (id: string): Promise<IPayment | null> => {
    const result = await Payment.findByIdAndDelete(id);
    return result;
  };

export const PaymentService = {
    createPaymentIntent,
    createPayment,
    getAllPayments,
    deletePayment
};
