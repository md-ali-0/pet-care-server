import express from 'express';
import { multerUpload } from '../../config/multer.config';
import auth from '../../middlewares/auth';
import { parseBody } from '../../middlewares/bodyParser';
import { user_role } from '../User/user.constant';
import { ProfileController } from './profile.controller';

const router = express.Router();

router.get(
    '/',
    auth(user_role.admin, user_role.user),
    ProfileController.getMyProfile
);

router.patch(
    '/',
    auth(user_role.admin, user_role.user),
    multerUpload.single('profilePhoto'),
    parseBody,
    ProfileController.updateMyProfile
)

export const ProfileRoutes = router;
