import z from 'zod';

export const CategoryServicesSchema = z.object({
  id: z.number(),
  pageId: z.number().nullable(),
  title: z.string(),
  slug: z.string(),
  fullAlias: z.string(),
  description: z.string().nullable(),
  isActive: z.boolean(),
  created: z.string(),
  updated: z.string(),
});

export const StoreCategoryServicesSchema = z.object({
  id: z.number(),
  pageId: z.union([z.string(), z.number()]).nullable(),
  title: z.string(),
  slug: z.string(),
  description: z.string().nullable(),
  isActive: z.boolean(),
  created: z.string(),
  updated: z.string(),
});

export const RequestCategoryServicesSchema = z.object({
  pageId: z.union([z.string(), z.number()]).nullable(),
  title: z.string(),
  slug: z.string().nullable(),
  description: z.string().nullable(),
  is_active: z.boolean(),
});

export const FetchCategoriesServicesSchema = z.object({
  status: z.boolean(),
  message: z.string(),
  data: z.array(CategoryServicesSchema),
});

export const FetchCategoryServicesSchema = z.object({
  status: z.boolean(),
  message: z.string(),
  data: CategoryServicesSchema,
});

export const ResponseCategoriesServicesSchema = z.object({
  status: z.boolean(),
  message: z.string(),
  data: StoreCategoryServicesSchema,
});

export const ResponseDeleteCategoriesServicesSchema = z.object({
  status: z.boolean(),
  message: z.string(),
  data: z.null(),
});

export type TCategoryServices = z.infer<typeof CategoryServicesSchema>;
export type TStoreCategoryServices = z.infer<typeof StoreCategoryServicesSchema>;
export type TCategoriesServices = TCategoryServices[];
export type TCategoryServicesRequest = z.infer<typeof RequestCategoryServicesSchema>;
export type TCategoryServicesResponse = z.infer<typeof ResponseCategoriesServicesSchema>;
export type TCategoryServicesDeleteResponse = z.infer<typeof ResponseDeleteCategoriesServicesSchema>;
