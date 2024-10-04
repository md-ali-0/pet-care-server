import { z } from 'zod';

export const createCommentSchema = z.object({
  body: z.object({
    post: z.any(),
    comment: z.string(),
  }),
});
export const updateCommentSchema = z.object({
  body: z.object({
    comment: z.string(),
  }),
});

export const commentValidation = {
  createCommentSchema,
  updateCommentSchema
};
