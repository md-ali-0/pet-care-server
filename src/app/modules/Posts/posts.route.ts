import { NextFunction, Request, Response, Router } from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { upload } from '../../utils/sendImageToCloudinary';
import { user_role } from '../User/user.constant';
import { postValidation } from './post.validation';
import { PostControllers } from './posts.controller';

const router = Router();

router.get('/', PostControllers.getAllPosts)

router.post(
  '/',
  auth(user_role.admin, user_role.user),
  upload.array('images', 10),
  (req: Request, res: Response, next: NextFunction) => {
    if (req.body.data) {
      req.body = JSON.parse(req.body.data);
    }
    next();
  },
  validateRequest(postValidation.createPostSchema),
  PostControllers.createPost
);

router.put(
  '/:id',
  auth(user_role.admin, user_role.user),
  validateRequest(postValidation.updatePostSchema),
  PostControllers.updatePost,
);

router.delete('/:id', auth(user_role.admin, user_role.user), PostControllers.deletePost);
router.get('/:id', PostControllers.getSinglePost);

export const PostRoutes = router;
