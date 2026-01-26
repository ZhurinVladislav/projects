import { z } from 'zod';

export const ServiceCategorySchema = z.object({
  id: z.number().nullish(),
  title: z.string().nullish(),
  fullAlias: z.string().nullish(),
  isActive: z.boolean().nullish(),
});

export const ServiceCategoriesSchema = z.array(ServiceCategorySchema);

export type TServiceCategory = z.infer<typeof ServiceCategorySchema>;

export const ServiceCategories = z.array(ServiceCategorySchema);

export type TServiceCategories = z.infer<typeof ServiceCategories>;

export const FetchServiceCategoriesSchema = z.object({
  data: ServiceCategories,
});

export type TFetchServiceCategories = z.infer<typeof FetchServiceCategoriesSchema>;
