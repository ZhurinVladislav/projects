import { request } from '@/lib/apiClient';
import { FetchServiceSchema, ResponseServiceSchema, TFetchService, TResponseService } from '@/types/Service/type';

export const fetchUpdateService = async (id: number, data: TFetchService): Promise<TResponseService> => {
  const validatedData = FetchServiceSchema.parse(data);

  return request(`/services/update/${id}`, ResponseServiceSchema, {
    method: 'PUT',
    body: JSON.stringify(validatedData),
  });
};
