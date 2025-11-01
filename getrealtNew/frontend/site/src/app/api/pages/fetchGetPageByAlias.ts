import { request } from '@/lib/apiClient';
import { ResponsePageSchema, TResponsePage } from '@/types';

export const fetchGetPageByAlias = async (alias: string): Promise<TResponsePage> => {
  // ⚠️ Если alias указывает на статик-файл — не делаем запрос
  if (!alias || /\.(png|jpg|jpeg|svg|webp|gif|ico|json|xml|txt|map)$/i.test(alias)) {
    return Promise.resolve({
      status: false,
      message: 'Static file, no page data',
      data: null,
    } as TResponsePage);
  }

  return request(`/pages/${alias}`, ResponsePageSchema, {
    next: { revalidate: 3600 },
  });
};
