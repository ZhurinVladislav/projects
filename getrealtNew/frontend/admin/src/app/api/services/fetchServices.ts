import { serverRequest } from '@/lib/apiClient';
import { ResponseServicesSchema } from '@/types/Service/type';

export const fetchServices = async () => serverRequest('/services', ResponseServicesSchema);
