import { default as bcrypt, default as bcryptjs } from 'bcryptjs';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import AppError from '../../errors/AppError';
import { EmailHelper } from '../../utils/emailSender';
import { createToken, verifyToken } from '../../utils/verifyJWT';
import { user_role } from '../User/user.constant';
import { User } from '../User/user.model';
import { TLoginUser, TRegisterUser } from './auth.interface';
const registerUser = async (payload: TRegisterUser) => {
  // checking if the user is exist
  const user = await User.isUserExistsByEmail(payload?.email);

  if (user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is already exist!');
  }

  payload.role = user_role.user;

  //create new user
  const result = await User.create(payload);

  return result;
};

const loginUser = async (payload: TLoginUser) => {
  // checking if the user is exist
  const user = await User.isUserExistsByEmail(payload?.email);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found!');
  }

  // checking if the user is blocked

  const userStatus = user?.status;

  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked!');
  }

  //checking if the password is correct

  if (!(await User.isPasswordMatched(payload?.password, user?.password)))
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');

  //create token and sent to the  client

  const jwtPayload = {
    user: user._id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    avatar: user.avatar,
    role: user.role,
    status: user.status,
    isPremium: user.isPremium
  };

  const accessToken = await createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string
  );

  const refreshToken = await createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string
  );

  return {accessToken, refreshToken};
};

const changePassword = async (
  userData: JwtPayload,
  payload: { oldPassword: string; newPassword: string }
) => {
  // checking if the user is exist
  const user = await User.isUserExistsByEmail(userData.email);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found!');
  }

  // checking if the user is blocked

  const userStatus = user?.status;

  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked!');
  }

  //checking if the password is correct

  if (!(await User.isPasswordMatched(payload.oldPassword, user?.password)))
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');

  //hash new password
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds)
  );

  await User.findOneAndUpdate(
    {
      email: userData.email,
      role: userData.role,
    },
    {
      password: newHashedPassword,
      passwordChangedAt: new Date(),
    }
  );

  return null;
};

const forgetPassword = async (email: string) => {
  const user = await User.isUserExistsByEmail(email);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found!');
  }

  // Checking if the user is blocked
  if (user.status === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'Your account is blocked');
  }

  const jwtPayload = { user: user._id, email: user.email, role: user.role };

  const token = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string
  );

  const resetUILink = `${config.client_url}/auth/change-password?id=${user._id}&token=${token}`;

  const htmlContent = await EmailHelper.createEmailContent(
    {
      reset_link: resetUILink,
    },
    'forgot-password'
  );

  const subject = `Reset Your Password`;

  await EmailHelper.sendEmail(user.email, htmlContent, subject);
};

const resetPassword = async (
  payload: { id: string; newPassword: string },
  token: string
) => {
  const user = await User.findById(payload.id);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'Your account is not found');
  }

  // Checking if the user is blocked
  if (user.status === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'Your account is blocked');
  }

  const decoded = await verifyToken(
    token,
    config.jwt_access_secret as string
  ) as JwtPayload;

  if (decoded.exp as number < Math.floor(Date.now() / 1000)) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Your Password Reset link is Expired!')
  }
  
  if (payload.id !== decoded.user) {
    throw new AppError(httpStatus.FORBIDDEN, 'You are forbidden!');
  }

  // Hash new password
  const newHashedPassword = await bcryptjs.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds)
  );

  await User.findByIdAndUpdate(
    user.id, 
    { password: newHashedPassword, passwordChangeAt: new Date() },
  );
};

const getRefreshToken = async (token: string) => {
  // verify token

  const decoded = await verifyToken(
      token,
      config.jwt_refresh_secret as string,
  );

  const { user } = decoded as JwtPayload;

  const authUser = await User.findById(user);

  // checking if the user is exists
  if (!authUser) {
      throw new AppError(httpStatus.NOT_FOUND, 'The user is not found');
  }

  const jwtPayload = {
    user: user._id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    avatar: user.avatar,
    role: user.role,
    status: user.status,
    isPremium: user.isPremium
  };

  const accessToken = await createToken(
      jwtPayload,
      config.jwt_access_secret as string,
      config.jwt_access_expires_in as string,
  );

  return accessToken
};

export const AuthServices = {
  registerUser,
  loginUser,
  changePassword,
  forgetPassword,
  resetPassword,
  getRefreshToken
};
