import { z } from 'zod';
import { user_role, user_status } from './user.constant';

const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
    }),
    role: z.nativeEnum(user_role),
    email: z
      .string({
        required_error: 'Email is required',
      })
      .email({
        message: 'Invalid email',
      }),
    password: z.string({
      required_error: 'Password is required',
    }),
    status: z.nativeEnum(user_status).default(user_status.active),
    mobileNumber: z.string().optional(),
  }),
});

const updateUserValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    role: z.nativeEnum(user_role).optional(),
    email: z.string().email().optional(),
    password: z.string().optional(),
    status: z.nativeEnum(user_status).optional(),
    mobileNumber: z.string().optional(),
  }),
});

export const UserValidation = {
  createUserValidationSchema,
  updateUserValidationSchema,
};
