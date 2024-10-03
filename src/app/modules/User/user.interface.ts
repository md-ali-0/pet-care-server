/* eslint-disable no-unused-vars */
import { Model, Schema } from 'mongoose';
import { user_role, user_status } from './user.constant';

export type TUser = {
  _id?: string;
  name: string;
  role: keyof typeof user_role;
  email: string;
  password: string;
  status: keyof typeof user_status;
  passwordChangedAt?: Date;
  phone?: string;
  cover?: string;
  avatar?: string;
  address?: string;
  followers: typeof Schema.ObjectId[]
  following: typeof Schema.ObjectId[]
  posts: typeof Schema.ObjectId[]
  isPremium: boolean;
  premiumExpireDate: Date;
  bio?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export interface IUserModel extends Model<TUser> {
  isUserExistsByEmail(id: string): Promise<TUser>;
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string
  ): Promise<boolean>;
  isJWTIssuedBeforePasswordChanged(
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number
  ): boolean;
}
