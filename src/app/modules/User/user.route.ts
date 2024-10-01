import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { user_role } from './user.constant';
import { UserControllers } from './user.controller';
import { UserValidation } from './user.validation';

const router = express.Router();

export const UserRoutes = router;

router.post(
  '/create-user',
  auth(user_role.admin),
  validateRequest(UserValidation.createUserValidationSchema),
  UserControllers.userRegister
);
router.get('/', UserControllers.getAllUsers);
router.get('/:id', UserControllers.getSingleUser);
