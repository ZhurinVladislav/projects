import { request } from '@/lib/apiClient';
import { ResponseCompaniesNotAliasSchema, TResponseNotAliasCompanies } from '@/types';

export const fetchCompaniesByPage = async (pageId?: number | null, params: Record<string, string | number | boolean> = {}): Promise<TResponseNotAliasCompanies> => {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      query.set(key, String(value));
    }
  });

  const path = pageId ? `/companies/by-page/${pageId}` : `/companies/by-page`;

  console.log(path);

  return request(`${path}?${query.toString()}`, ResponseCompaniesNotAliasSchema);
};
