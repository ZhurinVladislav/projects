import { serverRequest } from '@/lib/apiClient';
import { FetchCategoryServicesSchema } from '@/types/CategoryServices/type';

export const fetchShowCategoryServices = async (id: string) => serverRequest(`/categories-services/show/${id}`, FetchCategoryServicesSchema);
