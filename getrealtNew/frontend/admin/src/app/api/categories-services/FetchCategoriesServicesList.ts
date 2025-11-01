import { serverRequest } from '@/lib/apiClient';
import { FetchCategoriesServicesSchema } from '@/types/CategoryServices/type';

export const FetchCategoriesServicesList = async () => serverRequest('/categories-services', FetchCategoriesServicesSchema);
