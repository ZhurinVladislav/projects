import { z } from 'zod';

export const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  username: z.string(),
  email: z.string().email(),
});

export const FetchUserSchema = z
  .object({
    name: z.string().min(2, 'Имя должно быть не короче 2 символов'),
    username: z.string().min(2, 'Имя пользователя должно быть не короче 2 символов'),
    email: z.string().email('Неверный email'),
    password: z.string().min(6, 'Минимум 6 символов').optional().or(z.literal('')).nullable(),
    password_confirmation: z.string().optional().or(z.literal('')).nullable(),
  })
  .refine(
    data => {
      if (data.password && data.password !== data.password_confirmation) {
        return false;
      }
      return true;
    },
    { message: 'Пароли не совпадают', path: ['password_confirmation'] },
  );

export const RequestLoginSchema = z.object({
  username: z.string().min(1, 'Логин обязателен'),
  password: z.string().min(8, 'Пароль должен содержать минимум 8 символов'),
});

export const ResponseUserSchema = z.object({
  status: z.boolean(),
  message: z.string(),
  data: z.object({
    user: UserSchema,
    token: z.string(),
  }),
});

export const ResponseProfileUserSchema = z.object({
  status: z.boolean(),
  message: z.string(),
  data: z.object({
    user: UserSchema,
  }),
});

export type TUser = z.infer<typeof UserSchema>;

export type TFetchUser = z.infer<typeof FetchUserSchema>;

export type TRequestLogin = z.infer<typeof RequestLoginSchema>;
export type TResponseUser = z.infer<typeof ResponseUserSchema>;
