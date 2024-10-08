import express from 'express';
import { AuthRoutes } from '../modules/Auth/auth.route';
import { CommentRoutes } from '../modules/Comments/comment.route';
import { PostRoutes } from '../modules/Posts/posts.route';
import { UserRoutes } from '../modules/User/user.route';
import { VoteRoutes } from '../modules/Vote/vote.route';
import { PaymentRoutes } from '../modules/payment/payment.route';
import { PremiumRoutes } from '../modules/premium/premium.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/posts',
    route: PostRoutes,
  },
  {
    path: '/comment',
    route: CommentRoutes,
  },
  {
    path: '/vote',
    route: VoteRoutes,
  },
  {
    path: '/premium',
    route: PremiumRoutes,
  },
  {
    path: '/payment',
    route: PaymentRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
