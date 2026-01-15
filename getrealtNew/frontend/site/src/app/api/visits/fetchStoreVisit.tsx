import { request } from '@/lib/apiClient';
import { ResponseVisitSchema } from '@/types';

export const fetchStoreVisit = async () => {
  request('/visits', ResponseVisitSchema, {
    method: 'POST',
  });
};
