import { request } from '@/lib/apiClient';
import { FetchUserSchema, TFetchUser } from '@/types';

/**
 * Обновление пользователя
 * @param id — ID пользователя
 * @param data — Данные для обновления
 */
export const fetchUpdateUser = async (id: number, data: TFetchUser) => {
  return request(`/auth/update/${id}`, FetchUserSchema, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
};
