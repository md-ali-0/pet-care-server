/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt, { JwtPayload } from 'jsonwebtoken';
import AppError from '../errors/AppError';
import { user_role, user_status } from '../modules/User/user.constant';

export const createToken = (
  jwtPayload: {
    user?: string;
    name?: string;
    email: string;
    phone?: string;
    avatar?: string;
    role: keyof typeof user_role;
    status?: keyof typeof user_status;
  },
  secret: string,
  expiresIn: string
) => {
  return jwt.sign(jwtPayload, secret, {
    expiresIn,
  });
};

export const verifyToken = (
  token: string,
  secret: string
): JwtPayload | Error => {
  try {
    return jwt.verify(token, secret) as JwtPayload;
  } catch (error: any) {
    throw new AppError(401, 'You are not authorized!');
  }
};
