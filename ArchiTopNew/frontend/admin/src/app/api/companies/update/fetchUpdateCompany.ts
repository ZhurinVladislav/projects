import { ResponseCompanySchema, TFetchCompany } from '@/types';
import axios from 'axios';
import z from 'zod';

// export const fetchUpdateCompany = async (id: number, data: TFetchService): Promise<TResponseService> => {
//   const validatedData = FetchServiceSchema.parse(data);

//   return request(`/services/update/${id}`, ResponseServiceSchema, {
//     method: 'PUT',
//     body: JSON.stringify(validatedData),
//   });
// };

export const fetchUpdateCompany = async (id: number, data: TFetchCompany, removeImage: boolean): Promise<z.infer<typeof ResponseCompanySchema>> => {
  try {
    const formData = new FormData();

    formData.append('page_id', String(data.page_id ?? ''));
    formData.append('title', data.title.trim());
    formData.append('introtext', data.introtext?.trim() ?? '');
    // Добавляем файлы
    if (data.image instanceof File) {
      formData.append('image', data.image);
    }
    formData.append('image_alt', data.image_alt?.trim() ?? '');
    formData.append('phone', data.phone?.trim() ?? '');
    formData.append('email', data.email?.trim() ?? '');
    formData.append('site_url', data.site_url?.trim() ?? '');
    formData.append('experience', data.experience?.trim() ?? '');
    formData.append('address', data.address?.trim() ?? '');
    formData.append('map_link', data.map_link?.trim() ?? '');
    formData.append('promo', data.promo ? '1' : '0');
    if (removeImage) {
      formData.append('remove_image', '1');
    }

    // Добавляем массивы (правильно, как Laravel ожидает)
    data.service_category_ids.forEach(c => formData.append('service_category_ids[]', String(c)));
    data.service_ids.forEach(s => formData.append('service_ids[]', String(s)));

    if (data.ratings && data.ratings.length > 0) {
      data.ratings.forEach((rating, index) => {
        // Добавляем ID если есть (для обновления существующих)
        if (rating.id) {
          formData.append(`ratings[${index}][id]`, String(rating.id));
        }
        formData.append(`ratings[${index}][type]`, rating.type || '');
        formData.append(`ratings[${index}][link]`, rating.link || '');
        formData.append(`ratings[${index}][rating]`, String(rating.rating));
        formData.append(`ratings[${index}][total_reviews]`, String(rating.total_reviews));
      });
    }

    if (data.workdays && data.workdays.length > 0) {
      data.workdays.forEach((day, index) => {
        formData.append(`workdays[${index}][day]`, day.day || '');
        formData.append(`workdays[${index}][hours]`, day.hours || '');
        formData.append(`workdays[${index}][is_day_off]`, day.is_day_off ? '1' : '0');
      });
    }

    // 🔹 Социальные сети
    if (data.socials && data.socials.length > 0) {
      data.socials.forEach((social, index) => {
        formData.append(`socials[${index}][platform]`, social.platform || '');
        formData.append(`socials[${index}][url]`, social.url || '');
      });
    }

    // 🔹 Ссылки на сервисы
    if (data.services_links && data.services_links.length > 0) {
      data.services_links.forEach((link, index) => {
        formData.append(`services_links[${index}][service_name]`, link.service_name || '');
        formData.append(`services_links[${index}][url]`, link.url || '');
      });
    }

    // 🚀 Отправляем запрос
    const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/companies/update/${id}`, formData, {
      withCredentials: true,
      headers: { Accept: 'application/json' },
    });

    // ✅ Проверяем статус и валидируем через Zod (если нужно)
    const parsed = ResponseCompanySchema.safeParse(res.data);
    if (!parsed.success) {
      console.error('Ошибка Zod:', parsed.error.format());
      throw new Error('Ошибка структуры ответа от сервера');
    }

    if (!parsed.data.status) {
      throw new Error(parsed.data.message || 'Не удалось создать компанию');
    }

    return parsed.data;
  } catch (err: any) {
    console.error('Ошибка запроса fetchUpdateCompany:', err);

    throw new Error(err.response?.data?.message || err.message || 'Ошибка при сохранении компании');
  }
};
