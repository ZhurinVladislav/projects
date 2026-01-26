import z from 'zod';
import { StoreCategoryServicesSchema } from '../CategoryServices/type';

export const ServiceSchema = z.object({
  id: z.number(),
  title: z.string(),
  isActive: z.boolean(),
  categories: z.array(StoreCategoryServicesSchema).default([]),
  category_ids: z.array(z.number()).default([]),
  created: z.string(),
  updated: z.string(),
});

export const FetchServiceSchema = z.object({
  title: z.string(),
  is_active: z.boolean(),
  category_ids: z.array(z.number()).default([]),
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

export const ResponseDeleteServicesSchema = z.object({
  status: z.boolean(),
  message: z.string(),
  data: z.null(),
});

export type TService = z.infer<typeof ServiceSchema>;
export type TServices = TService[];

export type TFetchService = z.infer<typeof FetchServiceSchema>;

export type TResponseService = z.infer<typeof ResponseServiceSchema>;
export type TResponseServices = z.infer<typeof ResponseServicesSchema>;

export type TResponseServicesDelete = z.infer<typeof ResponseDeleteServicesSchema>;
