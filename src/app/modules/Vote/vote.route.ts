import { Router } from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { user_role } from '../User/user.constant';
import { VoteControllers } from './vote.controller';
import { voteValidation } from './vote.validation';

const router = Router();

router.post(
  '/upvote',
  auth(user_role.admin, user_role.user),
  validateRequest(voteValidation.upvoteSchema),
  VoteControllers.upvotePost
);

router.post(
  '/downvote',
  auth(user_role.admin, user_role.user),
  validateRequest(voteValidation.downvoteSchema),
  VoteControllers.downvotePost
);


export const VoteRoutes = router;
