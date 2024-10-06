import express, { NextFunction, Request, Response } from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { upload } from '../../utils/sendImageToCloudinary';
import { user_role } from './user.constant';
import { UserControllers } from './user.controller';
import { UserValidation } from './user.validation';

const router = express.Router();

export const UserRoutes = router;

router.get('/me', auth(user_role.admin, user_role.user), UserControllers.getMe);

router.post(
  '/create-user',
  auth(user_role.admin),
  validateRequest(UserValidation.createUserValidationSchema),
  UserControllers.userRegister
);
router.post('/profile/:id', UserControllers.getSingleUser);
router.get('/', UserControllers.getAllUsers);
router.get('/:id', UserControllers.getSingleUser);

router.put(
  '/me',
  upload.fields([
    { name: 'avatar', maxCount: 1 },
    { name: 'cover', maxCount: 1 },
  ]),
  (req: Request, res: Response, next: NextFunction) => {
    if (req.body.data) {
      req.body = JSON.parse(req.body.data);
    }
    next();
  },
  auth(user_role.admin, user_role.user),
  UserControllers.updateMe
);

router.post('/follow', auth(user_role.admin, user_role.user),UserControllers.followUser)
router.post('/unfollow', auth(user_role.admin, user_role.user),UserControllers.unfollowUser)
