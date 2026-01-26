import { request } from '@/lib/apiClient';
import { ResponseCategoriesServicesSchema, TResponseCategoriesServices } from '@/types';

export const fetchGetCategoriesServices = async (): Promise<TResponseCategoriesServices> => request('/categories-services', ResponseCategoriesServicesSchema);
