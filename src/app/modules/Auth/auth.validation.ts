import { z } from 'zod';

const registerValidationSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
    }),
    email: z.string({
      required_error: 'Email is required',
    }),
    password: z.string({ required_error: 'Password is required' }),
  }),
});

const loginValidationSchema = z.object({
  body: z.object({
    email: z.string({
      required_error: 'Email is required',
    }),
    password: z.string({ required_error: 'Password is required' }),
  }),
});

const changePasswordValidationSchema = z.object({
  body: z.object({
    oldPassword: z.string({
      required_error: 'Old password is required',
    }),
    newPassword: z.string({ required_error: 'Password is required' }),
  }),
});

const forgetPasswordValidationSchema = z.object({
  body: z.object({
      email: z.string({ required_error: 'Email is Required' }),
  }),
});

const resetPasswordValidationSchema = z.object({
  body: z.object({
      id: z.string({
          required_error: 'User id is required!',
      }),
      newPassword: z.string({
          required_error: 'User password is required!',
      }),
  }),
});

const refreshTokenValidationSchema = z.object({
  cookies: z.object({
      refreshToken: z.string({ required_error: 'Refresh Token is Required' }),
  }),
});

export const AuthValidation = {
  registerValidationSchema,
  loginValidationSchema,
  changePasswordValidationSchema,
  forgetPasswordValidationSchema,
  resetPasswordValidationSchema,
  refreshTokenValidationSchema
};
