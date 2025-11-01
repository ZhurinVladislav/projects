import { request } from '@/lib/apiClient';
import { ResponseServicesSchema, TResponseServices } from '@/types';

export const fetchGetCategoryServices = async (id: number): Promise<TResponseServices> => request(`/categories-services/services/${id}`, ResponseServicesSchema);
