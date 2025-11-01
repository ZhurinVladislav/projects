import { z } from 'zod';

export const PostSchema = z.object({
  id: z.number().nullish(),
  title: z.string().nullish(),
  categoryId: z.number().nullish(),
  categoryName: z.string().nullish(),
  content: z.string().nullish(),
  created: z.string().nullish(),
  updated: z.string().nullish(),
});

export const PostsSchema = z.array(PostSchema);

export type TPost = z.infer<typeof PostSchema>;

export const Posts = z.array(PostSchema);

export type TPosts = z.infer<typeof Posts>;

export const FetchPostsSchema = z.object({
  data: Posts,
});

export type TFetchPosts = z.infer<typeof FetchPostsSchema>;
