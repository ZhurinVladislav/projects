import { serverRequest } from '@/lib/apiClient';
import { ResponseProfileUserSchema, TUser } from '@/types';

export const fetchProfileUser = async (): Promise<TUser | any> => serverRequest('/auth/profile', ResponseProfileUserSchema);
