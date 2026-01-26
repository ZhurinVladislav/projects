import { request } from '@/lib/apiClient';
import { ResponseCompanyInfoSchema, TResponseCompanyInfo } from '@/types';

export const fetchCompanyByPage = async (id: number): Promise<TResponseCompanyInfo> => request(`/companies/show/${id}`, ResponseCompanyInfoSchema);
