import bcryptjs from 'bcryptjs';
import { Schema, Types } from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import config from '../../config';
import { sendImageToCloudinary } from '../../utils/sendImageToCloudinary';
import { UserSearchableFields } from './user.constant';
import { TUser } from './user.interface';
import { User } from './user.model';

const createUser = async (payload: TUser) => {
  const user = await User.create(payload);

  return user;
};

const getAllUsersFromDB = async (query: Record<string, unknown>) => {
  const UserQuery = new QueryBuilder(User.find(), query)
    .search(UserSearchableFields)
    .fields()
    .paginate()
    .sort()
    .filter()
    .limit()

  const meta = await UserQuery.countTotal();
  const data = await UserQuery.modelQuery;

  return {
    meta,
    data,
};
};

const getSingleUserFromDB = async (id: string) => {
  const user = await User.findById(id).populate('followers').populate('following').populate('posts');

  return user;
};

const getMe = async (email: string): Promise<TUser | null> => {
  const user = await User.findOne({ email });
  return user;
};
const updateMe = async (
  email: string,
  files: any,
  payload: any
): Promise<TUser | null> => {
  if (files.avatar) {
    const imageName = `avatar_${Math.random().toString().split('.')[1]}`;
    const path = files?.avatar[0]?.path;

    //send image to cloudinary
    const { secure_url } = await sendImageToCloudinary(imageName, path);
    payload.avatar = secure_url as string;
  }
  if (files.cover) {
    const imageName = `cover_${Math.random().toString().split('.')[1]}`;
    const path = files?.cover[0]?.path;

    //send image to cloudinary
    const { secure_url } = await sendImageToCloudinary(imageName, path);
    payload.cover = secure_url as string;
  }

  if (payload.password) {
    const password = await bcryptjs.hash(
      payload.password,
      Number(config.bcrypt_salt_rounds)
    );
    payload.password = password;
  }

  const user = await User.findOneAndUpdate({ email }, payload);
  return user;
};

const followUser = async (followerId: string, followingId: string) => {
  // Add followingId to follower's "following" list
  const follower = await User.findById(followerId);
  
  if (!follower?.following.includes(followingId as unknown as typeof Schema.ObjectId)) {
    await User?.updateOne({_id: new Types.ObjectId(followerId)},{ $push: {'following': followingId}})
    await User?.updateOne({_id: new Types.ObjectId(followingId)},{ $push: {'followers': followerId}})

  }

  return true
};

const unfollowUser = async (followerId: string, followingId: string) => {
  // Remove followingId from follower's "following" list
  const follower = await User.findById(followerId);

  if (follower?.following.includes(followingId as unknown as typeof Schema.ObjectId)) {
    await User?.updateOne({_id: new Types.ObjectId(followerId)},{ $pull: {'following': followingId}})
    await User?.updateOne({_id: new Types.ObjectId(followingId)},{ $pull: {'followers': followerId}})

  }

  return true
};

const updateUser = async (
  id: string,
  payload: Partial<TUser>,
): Promise<TUser | null> => {
  const user = await User.findByIdAndUpdate(id, payload, { new: true });
  return user;
};

const deleteUser = async (id: string): Promise<TUser | null> => {
  const result = await User.findByIdAndDelete(id);
  return result;
};

export const UserServices = {
  createUser,
  getAllUsersFromDB,
  getSingleUserFromDB,
  getMe,
  updateMe,
  followUser,
  unfollowUser,
  updateUser,
  deleteUser
};
