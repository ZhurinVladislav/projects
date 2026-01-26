export async function fetchDeletePage(id: number): Promise<void> {
  const res = await fetch(`/api/pages/delete/${id}`, {
    method: 'DELETE',
    credentials: 'include',
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.message || `Ошибка удаления (${res.status})`);
  }

  return;
}
// import { request } from '@/lib/apiClient';
// import { z } from 'zod';

// // Схема ответа от API (пример, настройте под ваш случай)
// const deleteResponseSchema = z.object({
//   success: z.boolean(),
//   message: z.string(),
// });

// export async function fetchDeletePage(id: number): Promise<void> {
//   try {
//     await request(`/pages/delete/${id}`, deleteResponseSchema, {
//       method: 'DELETE',
//       credentials: 'include', // Уже учтено в request
//     });
//   } catch (error) {
//     if (error instanceof Error) {
//       const data = await (await fetch(`/api/pages/delete/${id}`, { method: 'DELETE', credentials: 'include' })).json().catch(() => ({}));
//       throw new Error(data.message || `Ошибка удаления (${error.message})`);
//     }
//     throw new Error('Неизвестная ошибка удаления');
//   }
// }
