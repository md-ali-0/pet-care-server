import express from 'express';
import { AuthRoutes } from '../modules/Auth/auth.route';
import { ImageUploadRoutes } from '../modules/ImageUpload/imageUpload.routes';
import { PostRoutes } from '../modules/Posts/posts.route';
import { UserRoutes } from '../modules/User/user.route';

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
    path: '/image-upload',
    route: ImageUploadRoutes,
  },
  {
    path: '/posts',
    route: PostRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
