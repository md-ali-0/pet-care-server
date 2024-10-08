import bcrypt from 'bcryptjs';
import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';

const userRegister = catchAsync(async (req, res) => {
  const user = await UserServices.createUser(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User Created Successfully',
    data: user,
  });
});

const getAllUsers = catchAsync(async (req, res) => {
  const result = await UserServices.getAllUsersFromDB(req.query);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Users Retrieved Successfully',
    data: result.data,
    meta: result.meta,
  });
});

const getSingleUser = catchAsync(async (req, res) => {
  const user = await UserServices.getSingleUserFromDB(req.params.id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User Retrieved Successfully',
    data: user,
  });
});

const getMe = catchAsync(async (req, res) => {
  const { email } = req.user;
  
  const result = await UserServices.getMe(email);

  sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User profile retrieved successfully',
      data: result,
  });
});

const updateMe = catchAsync(async (req, res) => {
  const { email } = req.user;
  const payload = req.body
  const result = await UserServices.updateMe(email, req.files ,payload);

  sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User profile updated successfully',
      data: result,
  });
});

const followUser = catchAsync(async (req, res) => {
  const { user } = req.user;
  const payload = req.body

  const result = await UserServices.followUser(user, payload.followingId);

  sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User profile updated successfully',
      data: result,
  });
});

const unfollowUser = catchAsync(async (req, res) => {
  const { user } = req.user;
  const payload = req.body
  const result = await UserServices.unfollowUser(user, payload.followingId);

  sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User profile updated successfully',
      data: result,
  });
});

const updateUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const payload = {...req.body};

  if (req.body.password) {
      const hashPassword =  await bcrypt.hash(req.body.password, 12)
      payload.password = hashPassword
  } else {
      delete payload.password
  }
  const result = await UserServices.updateUser(id, payload);

  sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Profile updated successfully',
      data: result,
  });
});

const deleteUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await UserServices.deleteUser(id);

  sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User deleted successfully',
      data: result,
  });
});

export const UserControllers = {
  getSingleUser,
  userRegister,
  getAllUsers,
  getMe,
  updateMe,
  followUser,
  unfollowUser,
  updateUser,
  deleteUser
};
