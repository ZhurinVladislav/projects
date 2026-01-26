import { request } from '@/lib/apiClient';
import { ResponseDeleteServicesSchema, TResponseServicesDelete } from '@/types/Service/type';

export async function fetchDeleteService(id: number): Promise<TResponseServicesDelete> {
  return request(`/services/delete/${id}`, ResponseDeleteServicesSchema, {
    method: 'DELETE',
  });
}
