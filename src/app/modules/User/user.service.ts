import bcryptjs from 'bcryptjs';
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
  const users = new QueryBuilder(User.find(), query)
    .fields()
    .paginate()
    .sort()
    .filter()
    .search(UserSearchableFields);

  const result = await users.modelQuery;

  return result;
};

const getSingleUserFromDB = async (id: string) => {
  const user = await User.findById(id);

  return user;
};

const getMe = async (email: string): Promise<TUser | null> => {
  const user = await User.findOne({ email });
  return user;
};
const updateMe = async (email: string, files :any, payload: any): Promise<TUser | null> => {
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
    )
    payload.password = password
  }

  const user = await User.findOneAndUpdate({ email }, payload);
  return user;
};

export const UserServices = {
  createUser,
  getAllUsersFromDB,
  getSingleUserFromDB,
  getMe,
  updateMe
};
