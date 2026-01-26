import { request } from '@/lib/apiClient';
import { FetchCategoriesSchema } from '@/types/Category';

export const fetchGetCategories = async () => request('/categories', FetchCategoriesSchema);
