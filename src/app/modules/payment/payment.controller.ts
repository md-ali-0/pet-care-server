import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { PaymentService } from './payment.service';

const createPaymentIntent = catchAsync(async (req, res) => {
    const payload = req.body;
    const result = await PaymentService.createPaymentIntent(payload);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Payment created successfully',
        data: result,
    });
});

const getAllPayments = catchAsync(async (req, res) => {
    const result = await PaymentService.getAllPayments(req.query);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'All Payment Retrive successfully',
        data: result.data,
        meta: result.meta
    });
});

const createPayment = catchAsync(async (req, res) => {
    const payload = req.body;
    const result = await PaymentService.createPayment(payload);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Payment created successfully',
        data: result,
    });
});

const deletePayment = catchAsync(async (req, res) => {
    const {id} = req.params
    const result = await PaymentService.deletePayment(id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Payment created successfully',
        data: result,
    });
});

export const PaymentController = {
    getAllPayments,
    createPaymentIntent,
    createPayment,
    deletePayment
};
