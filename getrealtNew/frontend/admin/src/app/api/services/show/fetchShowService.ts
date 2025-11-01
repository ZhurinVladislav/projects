import { serverRequest } from '@/lib/apiClient';
import { ResponseServiceSchema } from '@/types/Service/type';

export const fetchShowService = async (id: string) => serverRequest(`/services/show/${id}`, ResponseServiceSchema);
