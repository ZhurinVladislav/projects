// export async function fetchGetPage(id: number): Promise<void> {
//   const res = await fetch(`/api/pages/${id}`, {
//     credentials: 'include',
//   });

//   if (!res.ok) {
//     const data = await res.json().catch(() => ({}));
//     throw new Error(data.message || `Ошибка удаления (${res.status})`);
//   }

//   return;
// }

import { serverRequest } from '@/lib/apiClient';
import { FetchPageSchema } from '@/types/pages/types';

export const fetchShowPage = async (id: string) => serverRequest(`/pages/show/${id}`, FetchPageSchema);
