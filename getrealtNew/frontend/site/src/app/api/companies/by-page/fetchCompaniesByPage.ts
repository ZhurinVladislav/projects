import { request } from '@/lib/apiClient';
import { ResponseCompaniesNotAliasSchema, TResponseNotAliasCompanies } from '@/types';

export const fetchCompaniesByPage = async (pageId: number, params?: Record<string, string | number | boolean>): Promise<TResponseNotAliasCompanies> => {
  const query = new URLSearchParams();
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== '') query.set(key, String(value));
    });
  }

  return request(`/companies/by-page/${pageId}?${query.toString()}`, ResponseCompaniesNotAliasSchema);
};
