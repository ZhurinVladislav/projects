import { request } from '@/lib/apiClient';
import { PageResponseSchema, TPageRequest } from '@/types/pages/types'; // схема ответа от API

/**
 * Обновление существующей страницы
 * @param id - ID страницы, которую обновляем
 * @param data - Обновлённые данные страницы
 */
export const fetchUpdatePage = async (id: number, data: TPageRequest) => {
  return request(`/pages/update/${id}`, PageResponseSchema, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
};
