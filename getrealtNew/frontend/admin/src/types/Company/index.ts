import z from 'zod';
import { StoreCategoryServicesSchema } from '../CategoryServices/type';

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

const FetchCompanyRatingSchema = z.object({
  id: z.number().optional(), // для обновления существующих
  type: z.string(),
  link: z.string().nullable(),
  rating: z.number().min(0).max(5),
  total_reviews: z.number().min(0),
});

const CompanySocialSchema = z.object({
  id: z.number(),
  platform: z.string().nullable(),
  url: z.string().nullable(),
});

const FetchCompanySocialSchema = z.object({
  platform: z.string().nullable(),
  url: z.string().nullable(),
});

const CompanyServiceLinkSchema = z.object({
  id: z.number(),
  serviceName: z.string().nullable(),
  url: z.string().nullable(),
});

const FetchCompanyServiceLinkSchema = z.object({
  serviceName: z.string().nullable(),
  url: z.string().nullable(),
});

const CompanyWorkdaySchema = z.object({
  id: z.number(),
  day: z.string().nullable(),
  hours: z.string().nullable(),
  isDayOff: z.boolean(),
});

const FetchCompanyWorkdaySchema = z.object({
  day: z.string().nullable(),
  hours: z.string().nullable(),
  isDayOff: z.boolean(),
});

const CompanyGallerySchema = z.object({
  id: z.number(),
  imageUrl: z.string().nullable(),
  imageAlt: z.string().nullable(),
});

const CompanyReviewSchema = z.object({
  id: z.number(),
  authorName: z.string().nullable(),
  rating: z.number().nullable(),
  comment: z.number().nullable(),
  source: z.number().nullable(),
  created: z.number().nullable(),
});

const CompanyServiceSchema = z.object({
  id: z.number(),
  title: z.string(),
  category_ids: z.array(z.number()).default([]),
  isActive: z.boolean(),
  created: z.string(),
  updated: z.string(),
});

const PropertyTypeSchema = z.object({
  id: z.number(),
  title: z.string(),
  slug: z.string(),
});

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
  socials: z.array(CompanySocialSchema).default([]),
  servicesLinks: z.array(CompanyServiceLinkSchema).default([]),
  workdays: z.array(CompanyWorkdaySchema).default([]),
  // gallery: z.array(CompanyGallerySchema).default([]),
  // reviews: z.array(CompanyReviewSchema).default([]),
  serviceCategories: z.array(StoreCategoryServicesSchema).default([]),
  services: z.array(CompanyServiceSchema).default([]),
  propertyTypes: z.array(PropertyTypeSchema).default([]),
  ratings: z.array(CompanyRatingSchema).default([]),
  created: z.string(),
  updated: z.string(),
});

// const [introtext, setIntrotext] = useState(obj?.introText ?? '');
// const [phone, setPhone] = useState(obj?.phone ?? '');
// const [email, setEmail] = useState(obj?.email ?? '');
// const [siteUrl, setSiteUrl] = useState(obj?.siteUrl ?? '');
// const [experience, setExperience] = useState(obj?.experience ?? '');
// const [address, setAddress] = useState(obj?.address ?? '');
// const [mapLink, setMapLink] = useState(obj?.mapLink ?? '');
// const [promo, setPromo] = useState(obj?.promo ?? false);

// export const FetchCompanySchema = z.object({
//   page_id: z.number().nullable(),
//   title: z.string(),
//   introtext: z.string().nullable(),
//   image: z
//     .union([
//       z
//         .instanceof(File)
//         .refine(file => ['image/jpeg', 'image/png', 'image/webp'].includes(file.type), {
//           message: 'Допустимые форматы: JPG, PNG, WEBP',
//         })
//         .refine(file => file.size <= 5 * 1024 * 1024, {
//           message: 'Файл не должен превышать 5 МБ',
//         }),
//       z.string().nullable(),
//     ])
//     .transform(value => value ?? null) // преобразуем undefined в null
//     .nullable(),
//   image_alt: z.string().nullable(),
//   phone: z.string().nullable(),
//   email: z.string().nullable(),
//   site_url: z.string().nullable(),
//   experience: z.string().nullable(),
//   address: z.string().nullable(),
//   map_link: z.string().nullable(),
//   promo: z.boolean(),
//   service_category_ids: z.array(z.number()).default([]),
//   service_ids: z.array(z.number()).default([]),
//   // created: z.string(),
//   // updated: z.string(),
// });

export const FetchCompanySchema = z.object({
  page_id: z.union([z.string(), z.number()]).nullable(),
  title: z.string(),
  introtext: z.string().nullable(),
  image: z.union([z.instanceof(File), z.string().nullable()]).nullable(),
  image_alt: z.string().nullable(),
  phone: z.string().nullable(),
  email: z.string().nullable(),
  site_url: z.string().nullable(),
  experience: z.string().nullable(),
  address: z.string().nullable(),
  map_link: z.string().nullable(),
  promo: z.boolean(),
  service_category_ids: z.array(z.number()).default([]),
  service_ids: z.array(z.number()).default([]),
  workdays: z
    .array(
      z.object({
        day: z.string().nullable(),
        hours: z.string().nullable(),
        is_day_off: z.boolean(),
      }),
    )
    .default([]),
  socials: z
    .array(
      z.object({
        platform: z.string().nullable(),
        url: z.string().nullable(),
      }),
    )
    .default([]),
  services_links: z
    .array(
      z.object({
        service_name: z.string().nullable(),
        url: z.string().nullable(),
      }),
    )
    .default([]),
  ratings: z
    .array(
      z.object({
        id: z.number().optional(),
        type: z.string(),
        link: z.string().nullable(),
        rating: z.number().min(0).max(5),
        total_reviews: z.number().min(0),
      }),
    )
    .default([]),
});

export const ResponseCompanySchema = z.object({
  status: z.boolean(),
  message: z.string(),
  data: CompanySchema,
});

// export const ResponseCompanySchema = z.object({
//   status: z.boolean(),
//   message: z.string(),
//   data: CompanySchema,
// });

export const ResponseCompaniesSchema = z.object({
  status: z.boolean(),
  message: z.string(),
  data: z.array(CompanySchema),
});

export const ResponseDeleteCompanySchema = z.object({
  status: z.boolean(),
  message: z.string(),
  data: z.null(),
});

export type TCompany = z.infer<typeof CompanySchema>;
export type TCompanies = TCompany[];

export type TCompanyWorkday = z.infer<typeof CompanyWorkdaySchema>;
export type TFetchCompanyWorkday = z.infer<typeof FetchCompanyWorkdaySchema>;

export type TCompanySocial = z.infer<typeof CompanySocialSchema>;
export type TFetchCompanySocialSchema = z.infer<typeof FetchCompanySocialSchema>;

export type TCompanyServiceLink = z.infer<typeof CompanyServiceLinkSchema>;
export type TFetchCompanyServiceLink = z.infer<typeof FetchCompanyServiceLinkSchema>;

export type TCompanyRating = z.infer<typeof CompanyRatingSchema>;
export type TFetchCompanyRating = z.infer<typeof FetchCompanyRatingSchema>;

export type TCompanyService = z.infer<typeof CompanyServiceSchema>;

export type TFetchCompany = z.infer<typeof FetchCompanySchema>;

export type TResponseCompany = z.infer<typeof ResponseCompanySchema>;
export type TResponseCompanies = z.infer<typeof ResponseCompaniesSchema>;

export type TResponseCompanyDelete = z.infer<typeof ResponseDeleteCompanySchema>;
