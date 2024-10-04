import { Router } from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { user_role } from '../User/user.constant';
import { CommentControllers } from './comment.controller';
import { commentValidation } from './comment.validation';

const router = Router();

router.get('/', CommentControllers.getAllComments)

router.post(
  '/',
  auth(user_role.admin, user_role.user),
  validateRequest(commentValidation.createCommentSchema),
  CommentControllers.createComment
);
router.put(
  '/:id',
  auth(user_role.admin, user_role.user),
  validateRequest(commentValidation.updateCommentSchema),
  CommentControllers.updateComment,
);

router.delete('/:id', auth(user_role.admin, user_role.user), CommentControllers.deleteComment);
router.get('/:id', CommentControllers.getSingleComment);

export const CommentRoutes = router;
