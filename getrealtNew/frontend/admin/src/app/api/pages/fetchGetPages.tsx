import { serverRequest } from '@/lib/apiClient';
import { FetchPagesSchema } from '@/types/pages/types';

export const fetchGetPages = async () => serverRequest('/pages', FetchPagesSchema);
