import { z } from 'zod';

export const PageChildSchema = z.object({
  id: z.number(),
  parentId: z.number().nullable(),
  alias: z.string(),
  fullUrl: z.string(),
  title: z.string().nullable(),
  longTitle: z.string().nullable(),
  description: z.string().nullable(),
  keywords: z.string().nullable(),
  content: z.string().nullable(),
  isPublished: z.boolean(),
  created: z.string(),
  updated: z.string(),
});

export const PageRequestSchema = z.object({
  parent_id: z.number().nullable(),
  page_title: z.string(),
  alias: z.string(),
  long_title: z.string().nullable(),
  description: z.string().nullable(),
  keywords: z.string().nullable(),
  content: z.string().nullable(),
  is_published: z.boolean(),
});

export const PageSchema = z.object({
  id: z.number(),
  parentId: z.number().nullable(),
  pageTitle: z.string(),
  alias: z.string(),
  fullAlias: z.string(),
  longTitle: z.string().nullable(),
  description: z.string().nullable(),
  keywords: z.string().nullable(),
  isPublished: z.boolean(),
  content: z.string().nullable(),
  created: z.string(),
  updated: z.string(),
  // children: z.array(PageChildSchema).optional(),
});

export const FetchPageListSchema = z.object({
  id: z.number(),
  parentId: z.number().nullable(),
  pageTitle: z.string(),
  isPublished: z.boolean(),
  created: z.string(),
  updated: z.string(),
});

export const PageSimpleSchema = z.object({
  id: z.number(),
  pageTitle: z.string(),
});

export const FetchPageSchema = z.object({
  status: z.boolean(),
  message: z.string(),
  data: PageSchema.nullable(),
});

export const FetchPagesSchema = z.object({
  status: z.boolean(),
  message: z.string(),
  data: z.array(FetchPageListSchema),
});

export const FetchPagesSimpleSchema = z.object({
  status: z.boolean(),
  message: z.string(),
  data: z.array(PageSimpleSchema),
});

export const PageResponseSchema = z.object({
  status: z.boolean(),
  message: z.string(),
  data: z.object({
    id: z.number(),
    parentId: z.number().nullable(),
    pageTitle: z.string(),
    isPublished: z.boolean(),
    created: z.string(),
    updated: z.string(),
  }),
});

export type TPage = z.infer<typeof PageSchema>;
export type TPageSimple = z.infer<typeof PageSimpleSchema>;

export type TFetchPages = z.infer<typeof FetchPagesSchema>;

export type TPageRequest = z.infer<typeof PageRequestSchema>;
export type TPageResponse = z.infer<typeof PageResponseSchema>;
