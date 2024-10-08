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

export const PaymentController = {
    createPaymentIntent,
    createPayment
};
