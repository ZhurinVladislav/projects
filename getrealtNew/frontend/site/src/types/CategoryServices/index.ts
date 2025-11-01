import { z } from 'zod';

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

export const CategoryServicesNotAliasSchema = z.object({
  id: z.number(),
  pageId: z.number().nullable(),
  title: z.string(),
  slug: z.string(),
  description: z.string().nullable(),
  isActive: z.boolean(),
  created: z.string(),
  updated: z.string(),
});

export const ServiceSchema = z.object({
  id: z.number(),
  title: z.string(),
  isActive: z.boolean(),
  created: z.string(),
  updated: z.string(),
});

export const ResponseCategoryServicesSchema = z.object({
  status: z.boolean(),
  message: z.string(),
  data: CategoryServicesSchema,
});

export const ResponseCategoriesServicesSchema = z.object({
  status: z.boolean(),
  message: z.string(),
  data: z.array(CategoryServicesSchema),
});

export const ResponseServiceSchema = z.object({
  status: z.boolean(),
  message: z.string(),
  data: ServiceSchema,
});

export const ResponseServicesSchema = z.object({
  status: z.boolean(),
  message: z.string(),
  data: z.array(ServiceSchema),
});

export type TCategoryServices = z.infer<typeof CategoryServicesSchema>;
export type TCategoriesServices = TCategoryServices[];

export type TService = z.infer<typeof ServiceSchema>;
export type TServices = TService[];

export type TResponseCategoryServices = z.infer<typeof ResponseCategoryServicesSchema>;
export type TResponseCategoriesServices = z.infer<typeof ResponseCategoriesServicesSchema>;

export type TResponseService = z.infer<typeof ResponseServiceSchema>;
export type TResponseServices = z.infer<typeof ResponseServicesSchema>;

// export const ServiceCategorySchema = z.object({
//   id: z.number().nullish(),
//   title: z.string().nullish(),
//   fullAlias: z.string().nullish(),
//   isActive: z.boolean().nullish(),
// });

// export const ServiceCategoriesSchema = z.array(ServiceCategorySchema);

// export type TServiceCategory = z.infer<typeof ServiceCategorySchema>;

// export const ServiceCategories = z.array(ServiceCategorySchema);

// export type TServiceCategories = z.infer<typeof ServiceCategories>;

// export const FetchServiceCategoriesSchema = z.object({
//   data: ServiceCategories,
// });

// export type TFetchServiceCategories = z.infer<typeof FetchServiceCategoriesSchema>;
