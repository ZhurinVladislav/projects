import { serverRequest } from '@/lib/apiClient';
import { ResponseCompaniesSchema } from '@/types';

export const fetchCompanies = async () => serverRequest('/companies', ResponseCompaniesSchema);
