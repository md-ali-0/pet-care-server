/* eslint-disable no-useless-escape */
import bcryptjs from 'bcryptjs';
import { Schema, model } from 'mongoose';
import config from '../../config';
import { user_role, user_status } from './user.constant';
import { IUserModel, TUser } from './user.interface';

const userSchema = new Schema<TUser, IUserModel>(
  {
    name: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: Object.keys(user_role),
      required: true,
    },
    email: {
      type: String,
      required: true,
      //validate email
      match: [
        /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
        'Please fill a valid email address',
      ],
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      select: 0,
    },
    status: {
      type: String,
      enum: Object.keys(user_status),
      default: user_status.active,
    },
    passwordChangedAt: {
      type: Date,
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
    birthdate: {
      type: Date,
    },
    avatar: {
      type: String,
      default: 'https://res.cloudinary.com/dy8ef1ngb/image/upload/v1727772191/ozwx2ubdwadyhymvrndc.png',
    },
    cover: {
      type: String,
      default: 'https://res.cloudinary.com/dy8ef1ngb/image/upload/v1727772191/umggkxsdtdao3y0m7nfw.jpg',
    },
    followers: [{ type: Schema.ObjectId, ref: 'User' }],
    following: [{ type: Schema.ObjectId, ref: 'User' }],
    posts: [{ type: Schema.ObjectId, ref: 'Post' }],
    isPremium: {
      type: Boolean,
      default: false
    },
    premiumExpireDate: {
      type: Date,
    },
    bio: {
      type: String,
      maxLength: 250,
    },
  },
  {
    timestamps: true,
    virtuals: true,
  }
);

userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this; // doc
  // hashing password and save into DB

  user.password = await bcryptjs.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );

  next();
});

// set '' after saving password
userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

userSchema.statics.isUserExistsByEmail = async function (email: string) {
  return await User.findOne({ email }).select('+password');
};

userSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword
) {
  return await bcryptjs.compare(plainTextPassword, hashedPassword);
};

userSchema.statics.isJWTIssuedBeforePasswordChanged = function (
  passwordChangedTimestamp: number,
  jwtIssuedTimestamp: number
) {
  const passwordChangedTime =
    new Date(passwordChangedTimestamp).getTime() / 1000;
  return passwordChangedTime > jwtIssuedTimestamp;
};

export const User = model<TUser, IUserModel>('User', userSchema);
