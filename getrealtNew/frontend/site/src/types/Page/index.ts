import z from 'zod';

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
});

export const ResponsePageSchema = z.object({
  status: z.boolean(),
  message: z.string(),
  data: PageSchema.nullable(),
});

export const ResponsePagesSchema = z.object({
  status: z.boolean(),
  message: z.string(),
  data: z.array(PageSchema),
});

export type TPage = z.infer<typeof PageSchema>;
export type TPages = TPage[];

export type TResponsePage = z.infer<typeof ResponsePageSchema>;
export type TResponsePages = z.infer<typeof ResponsePagesSchema>;
