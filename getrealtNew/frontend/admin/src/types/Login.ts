import z from 'zod';

export const LoginSchema = z.object({
  name: z.string().min(1, 'Это поле должно быть заполнено.'),
  password: z.string().min(8, 'Длина пароля должна быть не менее 8 символов'),
});

export type TLoginForm = z.infer<typeof LoginSchema>;

export const FetchLoginSchema = z.object({
  data: LoginSchema,
});
