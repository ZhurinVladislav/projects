import { request } from '@/lib/apiClient';
import { RequestCategoryServicesSchema, ResponseCategoriesServicesSchema, TCategoryServicesRequest, TCategoryServicesResponse } from '@/types/CategoryServices/type';

export const FetchStoreCategoryServices = async (data: TCategoryServicesRequest): Promise<TCategoryServicesResponse> => {
  // Валидация входных данных перед отправкой
  const validatedData = RequestCategoryServicesSchema.parse(data);

  return request('/categories-services/store', ResponseCategoriesServicesSchema, {
    method: 'POST',
    body: JSON.stringify(validatedData),
  });
};
