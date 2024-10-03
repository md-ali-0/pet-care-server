import { NextFunction, Request, Response, Router } from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { upload } from '../../utils/sendImageToCloudinary';
import { user_role } from '../User/user.constant';
import { postValidation } from './post.validation';
import { PostControllers } from './posts.controller';

const router = Router();

router.post(
  '/',
  upload.array('images', 10),
  (req: Request, res: Response, next: NextFunction) => {
    if (req.body.data) {
      req.body = JSON.parse(req.body.data);
    }
    next();
  },
  auth(user_role.admin, user_role.user),
  validateRequest(postValidation.createPostSchema),
  PostControllers.createPost
);

export const PostRoutes = router;
