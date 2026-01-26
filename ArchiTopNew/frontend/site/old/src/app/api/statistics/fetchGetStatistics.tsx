import { request } from '@/lib/apiClient';
import { ResponseStatisticsSchema } from '@/types';

export const fetchGetStatistics = async () => request('/statistics', ResponseStatisticsSchema);
