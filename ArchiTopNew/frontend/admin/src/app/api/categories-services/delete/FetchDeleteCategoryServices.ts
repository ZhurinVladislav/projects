// export async function FetchDeleteCategoryServices(id: number): Promise<void> {
//   const res = await fetch(`/api/categories-services/delete/${id}`, {
//     method: 'DELETE',
//     credentials: 'include',
//   });

import { request } from '@/lib/apiClient';
import { ResponseDeleteCategoriesServicesSchema, TCategoryServicesDeleteResponse } from '@/types/CategoryServices/type';

//   if (!res.ok) {
//     const data = await res.json().catch(() => ({}));
//     throw new Error(data.message || `Ошибка удаления (${res.status})`);
//   }

//   return;
// }

export async function FetchDeleteCategoryServices(id: number): Promise<TCategoryServicesDeleteResponse> {
  return request(`/categories-services/delete/${id}`, ResponseDeleteCategoriesServicesSchema, {
    method: 'DELETE',
  });
}
