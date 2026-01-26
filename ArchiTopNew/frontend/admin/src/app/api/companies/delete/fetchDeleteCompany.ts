import { request } from '@/lib/apiClient';
import { ResponseDeleteCompanySchema, TResponseCompanyDelete } from '@/types';

export async function fetchDeleteCompany(id: number): Promise<TResponseCompanyDelete> {
  return request(`/companies/delete/${id}`, ResponseDeleteCompanySchema, {
    method: 'DELETE',
  });
}
