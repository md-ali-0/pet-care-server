import { Router } from 'express';

import auth from '../../middlewares/auth';
import { user_role } from '../User/user.constant';
import { PaymentController } from './payment.controller';

const router = Router();

router.post(
    '/create-payment-intent',
    auth(user_role.admin, user_role.user),
    PaymentController.createPaymentIntent,
);
router.get(
    '/',
    auth(user_role.admin),
    PaymentController.getAllPayments,
);

router.post(
    '/create-payment',
    auth(user_role.admin, user_role.user),
    PaymentController.createPayment,
);

router.delete(
    '/:id',
    auth(user_role.admin),
    PaymentController.deletePayment,
);


export const PaymentRoutes = router;
