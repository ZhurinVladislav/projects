import { serverRequest } from '@/lib/apiClient';
import { FetchPagesSimpleSchema } from '@/types/pages/types';

export const fetchGetPagesSimple = async () => serverRequest('/pages-simple', FetchPagesSimpleSchema);
