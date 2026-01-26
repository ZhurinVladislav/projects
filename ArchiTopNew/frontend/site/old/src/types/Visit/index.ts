import z from 'zod';

export const VisitSchema = z.object({
  id: z.number(),
  ip: z.string().nullable(),
  userAgent: z.string().nullable(),
  created: z.string(),
});

export const ResponseVisitSchema = z.object({
  status: z.boolean(),
  message: z.string(),
  data: VisitSchema.nullable(),
});

export type TVisit = z.infer<typeof VisitSchema>;

export type TResponseVisit = z.infer<typeof ResponseVisitSchema>;
