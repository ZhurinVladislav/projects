import { request } from '@/lib/apiClient';
import { ResponseCategoriesServicesSchema, TCategoryServicesRequest } from '@/types/CategoryServices/type';

export const fetchUpdateCategoryService = async (id: number, data: TCategoryServicesRequest) => {
  return request(`/categories-services/update/${id}`, ResponseCategoriesServicesSchema, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
};
