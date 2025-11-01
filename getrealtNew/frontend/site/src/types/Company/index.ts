import { z } from 'zod';
import { CategoryServicesNotAliasSchema, CategoryServicesSchema } from '../CategoryServices';

const CompanyRatingSchema = z.object({
  id: z.number(),
  type: z.string(),
  type_name: z.string(),
  link: z.string().nullable(),
  rating: z.number(),
  total_reviews: z.number(),
  created_at: z.string().nullable(),
  updated_at: z.string().nullable(),
});

const CompanySocialSchema = z.object({
  id: z.number(),
  platform: z.string().nullable(),
  url: z.string().nullable(),
});

const CompanyServiceLinkSchema = z.object({
  id: z.number(),
  serviceName: z.string().nullable(),
  url: z.string().nullable(),
});

const CompanyServiceSchema = z.object({
  id: z.number(),
  title: z.string(),
  isActive: z.boolean(),
  created: z.string(),
  updated: z.string(),
});

const CompanyWorkdaySchema = z.object({
  id: z.number(),
  day: z.string().nullable(),
  hours: z.string().nullable(),
  isDayOff: z.boolean(),
});

const PropertyTypeSchema = z.object({
  id: z.number(),
  title: z.string(),
  slug: z.string(),
});

// Компания
export const CompanySchema = z.object({
  id: z.number(),
  // pageId: z.string().nullable(),
  pageId: z.union([z.string(), z.number()]).nullable(),
  title: z.string(),
  introText: z.string().nullable(),
  image: z.string().nullable(),
  imageAlt: z.string().nullable(),
  phone: z.string().nullable(),
  email: z.string().nullable(),
  siteUrl: z.string().nullable(),
  experience: z.string().nullable(),
  address: z.string().nullable(),
  mapLink: z.string().nullable(),
  promo: z.boolean(),
  rating: z.number(),
  totalReviews: z.number(),
  // socials: z.array(CompanySocialSchema).default([]),
  // servicesLinks: z.array(CompanyServiceLinkSchema).default([]),
  // workdays: z.array(CompanyWorkdaySchema).default([]),
  // gallery: z.array(CompanyGallerySchema).default([]),
  // reviews: z.array(CompanyReviewSchema).default([]),
  serviceCategories: z.array(CategoryServicesSchema).default([]),
  services: z.array(CompanyServiceSchema).default([]),
  propertyTypes: z.array(PropertyTypeSchema).default([]),
  created: z.string(),
  updated: z.string(),
});

export const CompanyServicesSchema = z.object({
  id: z.number(),
  title: z.string(),
  isActive: z.boolean(),
  category_ids: z.array(z.number()).default([]),
  created: z.string().nullable(),
  updated: z.string().nullable(),
});

export const CompanyCategoryServicesSchema = z.object({
  id: z.number(),
  pageId: z.number().nullable(),
  title: z.string(),
  slug: z.string(),
  description: z.string().nullable(),
  isActive: z.boolean(),
  services: z.array(CompanyServicesSchema).default([]),
  created: z.string().nullable(),
  updated: z.string().nullable(),
});

export const CompanyInfoSchema = z.object({
  id: z.number(),
  pageId: z.union([z.string(), z.number()]).nullable(),
  title: z.string(),
  introText: z.string().nullable(),
  image: z.string().nullable(),
  imageAlt: z.string().nullable(),
  phone: z.string().nullable(),
  email: z.string().nullable(),
  siteUrl: z.string().nullable(),
  experience: z.string().nullable(),
  address: z.string().nullable(),
  mapLink: z.string().nullable(),
  promo: z.boolean(),
  rating: z.number(),
  totalReviews: z.number(),
  ratings: z.array(CompanyRatingSchema).default([]),
  socials: z.array(CompanySocialSchema).default([]),
  servicesLinks: z.array(CompanyServiceLinkSchema).default([]),
  workdays: z.array(CompanyWorkdaySchema).default([]),
  // gallery: z.array(CompanyGallerySchema).default([]),
  // gallery: [],
  // reviews: z.array(CompanyReviewSchema).default([]),
  serviceCategories: z.array(CompanyCategoryServicesSchema).default([]),
  services: z.array(CompanyServicesSchema).default([]),
  propertyTypes: z.array(PropertyTypeSchema).default([]),
  url: z.string().nullable(),
  created: z.string(),
  updated: z.string(),
});

export const CompanyNotAliasSchema = z.object({
  id: z.number(),
  pageId: z.union([z.string(), z.number()]).nullable(),
  title: z.string(),
  introText: z.string().nullable(),
  image: z.string().nullable(),
  imageAlt: z.string().nullable(),
  phone: z.string().nullable(),
  email: z.string().nullable(),
  siteUrl: z.string().nullable(),
  experience: z.string().nullable(),
  address: z.string().nullable(),
  mapLink: z.string().nullable(),
  promo: z.boolean(),
  rating: z.number(),
  totalReviews: z.number(),
  ratings: z.array(CompanyRatingSchema).default([]),
  socials: z.array(CompanySocialSchema).default([]),
  servicesLinks: z.array(CompanyServiceLinkSchema).default([]),
  workdays: z.array(CompanyWorkdaySchema).default([]),
  // gallery: z.array(CompanyGallerySchema).default([]),
  // gallery: [],
  // reviews: z.array(CompanyReviewSchema).default([]),
  serviceCategories: z.array(CategoryServicesNotAliasSchema).default([]),
  services: z.array(CompanyServiceSchema).default([]),
  propertyTypes: z.array(PropertyTypeSchema).default([]),
  url: z.string().nullable(),
  created: z.string(),
  updated: z.string(),
});

export const MetaSchema = z.object({
  current_page: z.number(),
  last_page: z.number(),
  per_page: z.number(),
  total: z.number(),
});

export const ResponseCompanySchema = z.object({
  status: z.boolean(),
  message: z.string(),
  data: CompanySchema,
});

export const ResponseCompaniesSchema = z.object({
  status: z.boolean(),
  message: z.string(),
  data: z.array(CompanySchema),
  meta: MetaSchema,
});

export const ResponseCompanyNotAliasSchema = z.object({
  status: z.boolean(),
  message: z.string(),
  data: CompanyNotAliasSchema,
});

export const ResponseCompanyInfoSchema = z.object({
  status: z.boolean(),
  message: z.string(),
  data: CompanyInfoSchema,
});

export const ResponseCompaniesNotAliasSchema = z.object({
  status: z.boolean(),
  message: z.string(),
  data: z.array(CompanyNotAliasSchema),
  meta: MetaSchema,
});

export type TCompany = z.infer<typeof CompanySchema>;
export type TCompanies = TCompany[];

export type TCompanyNotAlias = z.infer<typeof CompanyNotAliasSchema>;
export type TCompaniesNotAlias = TCompanyNotAlias[];

export type TCompanyInfo = z.infer<typeof CompanyInfoSchema>;
export type TCompaniesInfo = TCompanyInfo[];

export type TResponseCompany = z.infer<typeof ResponseCompanySchema>;
export type TResponseCompanies = z.infer<typeof ResponseCompaniesSchema>;

export type TCompanyWorkday = z.infer<typeof CompanyWorkdaySchema>;

export type TCompanySocial = z.infer<typeof CompanySocialSchema>;

export type TCompanyServiceLink = z.infer<typeof CompanyServiceLinkSchema>;

export type TCompanyRating = z.infer<typeof CompanyRatingSchema>;

export type TResponseNotAliasCompanies = z.infer<typeof ResponseCompaniesNotAliasSchema>;
export type TResponseNotAliasCompany = z.infer<typeof ResponseCompanyNotAliasSchema>;

export type TResponseCompanyInfo = z.infer<typeof ResponseCompanyInfoSchema>;
