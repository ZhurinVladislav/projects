import { z } from 'zod';

export const CategorySchema = z.object({
  id: z.number().nullish(),
  name: z.string().nullish(),
  content: z.string().nullish(),
  link: z.string().nullish(),
  created: z.string().nullish(),
  updated: z.string().nullish(),
});

export const CategoriesSchema = z.array(CategorySchema);

export type TCategory = z.infer<typeof CategorySchema>;

export const Categories = z.array(CategorySchema);

export type TCategories = z.infer<typeof Categories>;

export const FetchCategoriesSchema = z.object({
  data: Categories,
});

export type TFetchCategories = z.infer<typeof FetchCategoriesSchema>;
