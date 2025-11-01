import { serverRequest } from '@/lib/apiClient';
import { ResponseCompanySchema } from '@/types';

export const fetchShowCompany = async (id: string) => serverRequest(`/companies/show/${id}`, ResponseCompanySchema);
