import { Router } from 'express';
import auth from '../../middlewares/auth';
import { user_role } from '../User/user.constant';
import { PremiumController } from './premium.controller';

const router = Router();

router.post(
  '/check-premium-available/:id',
  auth(user_role.admin, user_role.user),
  PremiumController.checkIsPremiumAvailable
);

export const PremiumRoutes = router;
