import { request } from '@/lib/apiClient';
import { FetchServiceSchema, ResponseServiceSchema, TFetchService, TResponseService } from '@/types/Service/type';

export const fetchStoreService = async (data: TFetchService): Promise<TResponseService> => {
  // Валидация входных данных перед отправкой
  const validatedData = FetchServiceSchema.parse(data);

  return request('/services/store', ResponseServiceSchema, {
    method: 'POST',
    body: JSON.stringify(validatedData),
  });
};
