import { z } from 'zod';

export const createPostSchema = z.object({
  body: z.object({
    title: z.string(),
    content: z.string(),
    category: z.union([z.literal('Tip'), z.literal('Story')]),
    isPremium: z.boolean().optional(),
  }),
});

export const updatePostSchema = z.object({
  body: z.object({
    title: z.string(),
    content: z.string(),
    category: z.union([z.literal('Tip'), z.literal('Story')]),
    isPremium: z.boolean().optional(),
  }),
});

export const postValidation = {
  createPostSchema,
  updatePostSchema
};
