// import { requestLogin } from '@/lib/apiClientLogin';
// import { LoginRequest, LoginRequestSchema, LoginResponse, LoginResponseSchema } from '@/types/auth/types';

// export const fetchLogin = async (data: LoginRequest): Promise<LoginResponse> => {
//   // Валидация входных данных перед отправкой
//   const validatedData = LoginRequestSchema.parse(data);

//   return requestLogin('/auth', LoginResponseSchema, {
//     method: 'POST',
//     body: JSON.stringify(validatedData),
//   });
// };
import { request } from '@/lib/apiClient';
import { RequestLoginSchema, ResponseUserSchema, TRequestLogin, TResponseUser } from '@/types';

export const fetchLogin = async (data: TRequestLogin): Promise<TResponseUser> => {
  const validatedData = RequestLoginSchema.parse(data);

  return request('/auth', ResponseUserSchema, {
    method: 'POST',
    body: JSON.stringify(validatedData),
  });
};
