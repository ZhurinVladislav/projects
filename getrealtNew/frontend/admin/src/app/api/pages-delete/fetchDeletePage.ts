export const fetchDeletePage = async (id: number): Promise<void> => {
  console.log('Удаляем страницу с ID:', id);

  const res = await fetch(`/api/pages-delete/${id}`, {
    method: 'DELETE',
    credentials: 'include',
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.message || `Ошибка удаления (${res.status})`);
  }

  return;
};

// import { request } from '@/lib/apiClient';
// import { z } from 'zod';

// // Zod-схема для ответа
// const deletePageSchema = z.object({
//   success: z.boolean(),
//   message: z.string(),
// });

// export const fetchDeletePage = async (id: number): Promise<void> => {
//   console.log('Удаляем страницу с ID:', id);

//   try {
//     await request(`/api/pages-delete/${id}`, deletePageSchema, {
//       method: 'DELETE',
//       credentials: 'include',
//     });
//     console.log('Страница успешно удалена');
//   } catch (error) {
//     console.error('Ошибка удаления:', error);
//     throw new Error(error instanceof Error ? error.message : 'Ошибка удаления страницы');
//   }
// };
