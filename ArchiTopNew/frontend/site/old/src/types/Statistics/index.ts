import z from 'zod';

export const StatisticsSchema = z.object({
  companies: z.number().nullable(),
  services: z.number().nullable(),
  reviews: z.number().nullable(),
  visitors: z.number().nullable(),
});

export const ResponseStatisticsSchema = z.object({
  status: z.boolean(),
  message: z.string(),
  data: StatisticsSchema.nullable(),
});

export type TStatistics = z.infer<typeof StatisticsSchema>;

export type TResponseStatistics = z.infer<typeof ResponseStatisticsSchema>;
