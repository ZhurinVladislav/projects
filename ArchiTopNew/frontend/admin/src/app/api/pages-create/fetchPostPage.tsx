import { request } from '@/lib/apiClient';
import { PageRequestSchema, PageResponseSchema, TPageRequest, TPageResponse } from '@/types/pages/types';

export const fetchPostPage = async (data: TPageRequest): Promise<TPageResponse> => {
  // Валидация входных данных перед отправкой
  const validatedData = PageRequestSchema.parse(data);

  return request('/pages-create', PageResponseSchema, {
    method: 'POST',
    body: JSON.stringify(validatedData),
  });
};
