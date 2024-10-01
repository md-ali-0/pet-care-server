import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthServices } from './auth.service';

const registerUser = catchAsync(async (req, res) => {
  const result = await AuthServices.registerUser(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User registered in successfully!',
    data: result
  });
});

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);
  
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User logged in successfully!',
    data: result
  });
});

const changePassword = catchAsync(async (req, res) => {
  const { ...passwordData } = req.body;

  const result = await AuthServices.changePassword(req.user, passwordData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password updated successfully!',
    data: result,
  });
});

const forgetPassword = catchAsync(async (req, res) => {
  const email = req.body.email;

  const result = await AuthServices.forgetPassword(email);

  sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Reset link is generated successfully',
      data: result,
  });
});

const resetPassword = catchAsync(async (req, res) => {
  const payload = req.body;
  const token = req.headers.authorization;
  
  const result = await AuthServices.resetPassword(payload, token as string);

  sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Password reset succesful!',
      data: result,
  });
});

export const AuthControllers = {
  registerUser,
  loginUser,
  changePassword,
  forgetPassword,
  resetPassword,
};
