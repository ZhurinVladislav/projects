import { request } from '@/lib/apiClient';
import { ResponseServicesSchema } from '@/types';

export const fetchGetServices = async () => request('/services', ResponseServicesSchema);
