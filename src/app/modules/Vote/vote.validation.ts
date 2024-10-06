import { z } from 'zod';

export const upvoteSchema = z.object({
  body: z.object({
    post: z.any(),
  }),
});
export const downvoteSchema = z.object({
  body: z.object({
    post: z.any(),
  }),
});

export const voteValidation = {
  upvoteSchema,
  downvoteSchema
};
