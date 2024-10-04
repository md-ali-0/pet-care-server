import { z } from 'zod';

export const createPostSchema = z.object({
  body: z.object({
    author: z.any(),
    title: z.string(),
    content: z.string(),
    category: z.union([z.literal('Tip'), z.literal('Story')]),
    imageUrls: z.array(z.string()).optional(),
    isPremium: z.boolean().optional(),
    voteCount: z
      .object({
        upvotes: z.number(),
        downvotes: z.number(),
      })
      .optional(),
  }),
});

export const postValidation = {
  createPostSchema,
};
