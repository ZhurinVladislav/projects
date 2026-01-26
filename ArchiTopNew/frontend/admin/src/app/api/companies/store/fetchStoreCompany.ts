// /**
//  * Создание компании (с поддержкой загрузки изображения)
//  */
// export const fetchStoreCompany = async (data: TFetchCompany): Promise<TResponseCompany> => {
//   const isFileUpload = data.image instanceof File;

//   if (isFileUpload) {
//     // ✅ Если есть файл — собираем FormData
//     const formData = new FormData();

//     // Приводим значения к строкам, избегая null
//     const safeAppend = (key: string, value: unknown) => {
//       if (value !== undefined && value !== null) {
//         formData.append(key, String(value));
//       }
//     };

//     safeAppend('title', data.title);
//     safeAppend('page_id', data.page_id);
//     safeAppend('introtext', data.introtext);
//     safeAppend('image_alt', data.image_alt);
//     safeAppend('phone', data.phone);
//     safeAppend('email', data.email);
//     safeAppend('site_url', data.site_url);
//     safeAppend('experience', data.experience);
//     safeAppend('address', data.address);
//     safeAppend('map_link', data.map_link);
//     safeAppend('promo', data.promo ? '1' : '0');

//     // Массивы — сериализуем в JSON
//     (data.category_ids || []).forEach(id => formData.append('category_ids[]', String(id)));
//     (data.service_ids || []).forEach(id => formData.append('service_ids[]', String(id)));

//     // ✅ Добавляем файл, только если он есть
//     if (data.image instanceof File) {
//       formData.append('image', data.image);
//     }

//     return request('/companies/store', ResponseCompanySchema, {
//       method: 'POST',
//       body: formData,
//       isFormData: true,
//     });
//   }

//   // ✅ Если файл не загружен — обычный JSON запрос
//   const validated = FetchCompanySchema.parse(data);

//   return request('/companies/store', ResponseCompanySchema, {
//     method: 'POST',
//     body: JSON.stringify(validated),
//   });
// };

// export const fetchStoreCompany = async (data: TFetchCompany): Promise<TResponseCompany> => {
// export const fetchStoreCompany = async (data: TFetchCompany): Promise<any> => {
//   const formData = new FormData();

//   formData.append('page_id', String(data.page_id ?? ''));
//   formData.append('title', data.title ?? '');
//   formData.append('introtext', data.introtext ?? '');
//   formData.append('image_alt', data.image_alt ?? '');
//   formData.append('phone', data.phone ?? '');
//   formData.append('email', data.email ?? '');
//   formData.append('site_url', data.site_url ?? '');
//   formData.append('experience', data.experience ?? '');
//   formData.append('address', data.address ?? '');
//   formData.append('map_link', data.map_link ?? '');
//   formData.append('promo', data.promo ? '1' : '0');

//   formData.append('service_category_ids', JSON.stringify(data.service_category_ids || []));
//   formData.append('service_ids', JSON.stringify(data.service_ids || []));

//   if (data.image instanceof File) formData.append('image', data.image);

//   // ✅ Проверка содержимого
//   for (const [key, value] of formData.entries()) {
//     console.log(key, value);
//   }

//   return requestFormData('/companies/store', ResponseCompanySchema, {
//     method: 'POST',
//     body: formData,
//     isFormData: true,
//   });
// };

//

// export const fetchStoreCompany = async (data: any): Promise<any> => {
//   const formData = new FormData();

//   console.log(formData);

//   // Приводим всё к строкам
//   formData.append('page_id', String(data.page_id ?? ''));
//   formData.append('title', String(data.title ?? ''));
//   formData.append('introtext', String(data.introtext ?? ''));
//   formData.append('image_alt', String(data.image_alt ?? ''));
//   formData.append('phone', String(data.phone ?? ''));
//   formData.append('email', String(data.email ?? ''));
//   formData.append('site_url', String(data.site_url ?? ''));
//   formData.append('experience', String(data.experience ?? ''));
//   formData.append('address', String(data.address ?? ''));
//   formData.append('map_link', String(data.map_link ?? ''));
//   formData.append('promo', data.promo ? '1' : '0'); // boolean → "1"/"0"

//   // Массивы сериализуем в JSON-строку
//   formData.append('service_category_ids', JSON.stringify(data.service_category_ids ?? []));
//   formData.append('service_ids', JSON.stringify(data.service_ids ?? []));

//   // Файл
//   if (data.image instanceof File) {
//     formData.append('image', data.image);
//   }

//   return requestFormData('/companies/store', ResponseCompanySchema, {
//     method: 'POST',
//     body: formData,
//     isFormData: true,
//   });
// };

import { ResponseCompanySchema, TFetchCompany } from '@/types';
import axios from 'axios';
import z from 'zod';

export const fetchStoreCompany = async (data: TFetchCompany): Promise<z.infer<typeof ResponseCompanySchema>> => {
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

    // Добавляем массивы (правильно, как Laravel ожидает)
    data.service_category_ids.forEach(c => formData.append('service_category_ids[]', String(c)));
    data.service_ids.forEach(s => formData.append('service_ids[]', String(s)));

    if (data.workdays && data.workdays.length > 0) {
      data.workdays.forEach((day: any, index: number) => {
        formData.append(`workdays[${index}][day]`, day.day || '');
        formData.append(`workdays[${index}][hours]`, day.hours || '');
        formData.append(`workdays[${index}][is_day_off]`, day.is_day_off ? '1' : '0');
      });
    }

    // 🔹 Социальные сети
    if (data.socials && data.socials.length > 0) {
      data.socials.forEach((social: any, index: number) => {
        formData.append(`socials[${index}][platform]`, social.platform || '');
        formData.append(`socials[${index}][url]`, social.url || '');
      });
    }

    // 🔹 Ссылки на сервисы
    if (data.services_links && data.services_links.length > 0) {
      data.services_links.forEach((link: any, index: number) => {
        formData.append(`services_links[${index}][service_name]`, link.service_name || '');
        formData.append(`services_links[${index}][url]`, link.url || '');
      });
    }

    if (data.ratings && data.ratings.length > 0) {
      data.ratings.forEach((rating, index) => {
        formData.append(`ratings[${index}][type]`, rating.type || '');
        formData.append(`ratings[${index}][link]`, rating.link || '');
        formData.append(`ratings[${index}][rating]`, String(rating.rating));
        formData.append(`ratings[${index}][total_reviews]`, String(rating.total_reviews));
      });
    }

    // 🧩 Обычные поля
    // formData.append('page_id', String(data.page_id ?? ''));
    // formData.append('title', String(data.title ?? ''));
    // formData.append('introtext', String(data.introtext ?? ''));
    // formData.append('image_alt', String(data.image_alt ?? ''));
    // formData.append('phone', String(data.phone ?? ''));
    // formData.append('email', String(data.email ?? ''));
    // formData.append('site_url', String(data.site_url ?? ''));
    // formData.append('experience', String(data.experience ?? ''));
    // formData.append('address', String(data.address ?? ''));
    // formData.append('map_link', String(data.map_link ?? ''));
    // formData.append('promo', data.promo ? '1' : '0');

    // // 🧩 Массивы (Laravel ожидает формат name[])
    // if (Array.isArray(data.service_category_ids)) {
    //   data.service_category_ids.forEach((id: number) => formData.append('service_category_ids[]', String(id)));
    // }
    // if (Array.isArray(data.service_ids)) {
    //   data.service_ids.forEach((id: number) => formData.append('service_ids[]', String(id)));
    // }

    // // 🧩 Файлы
    // if (data.image instanceof File) {
    //   formData.append('image', data.image);
    // }

    // 🧩 Галерея, если есть
    // if (Array.isArray(data.gallery)) {
    //   data.gallery.forEach((file: File) => formData.append('gallery[]', file));
    // }

    console.log(formData);

    // 🚀 Отправляем запрос
    const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/companies/store`, formData, {
      withCredentials: true,
      headers: {
        Accept: 'application/json',
      },
    });

    console.log(res.data);

    // ✅ Проверяем статус и валидируем через Zod (если нужно)
    const parsed = ResponseCompanySchema.safeParse(res.data);
    if (!parsed.success) {
      console.error('❌ Ошибка Zod:', parsed.error.format());
      throw new Error('Ошибка структуры ответа от сервера');
    }

    if (!parsed.data.status) {
      throw new Error(parsed.data.message || 'Не удалось создать компанию');
    }

    return parsed.data;
  } catch (err: any) {
    console.error('🚨 Ошибка запроса fetchStoreCompany:', err);

    throw new Error(err.response?.data?.message || err.message || 'Ошибка при сохранении компании');
  }
};

// export const fetchStoreCompany = async (data: any): Promise<any> => {
//   try {
//     const formData = new FormData();

//     // 🧩 Обычные поля
//     formData.append('page_id', String(data.page_id ?? ''));
//     formData.append('title', String(data.title ?? ''));
//     formData.append('introtext', String(data.introtext ?? ''));
//     formData.append('image_alt', String(data.image_alt ?? ''));
//     formData.append('phone', String(data.phone ?? ''));
//     formData.append('email', String(data.email ?? ''));
//     formData.append('site_url', String(data.site_url ?? ''));
//     formData.append('experience', String(data.experience ?? ''));
//     formData.append('address', String(data.address ?? ''));
//     formData.append('map_link', String(data.map_link ?? ''));
//     formData.append('promo', data.promo ? '1' : '0');

//     // 🧩 Массивы (Laravel ожидает формат name[])
//     if (Array.isArray(data.service_category_ids)) {
//       data.service_category_ids.forEach((id: number) =>
//         formData.append('service_category_ids[]', String(id))
//       );
//     }

//     if (Array.isArray(data.service_ids)) {
//       data.service_ids.forEach((id: number) =>
//         formData.append('service_ids[]', String(id))
//       );
//     }

//     // 🧩 Файлы
//     if (data.image instanceof File) {
//       formData.append('image', data.image);
//     }

//     // 🧩 Галерея (если есть)
//     if (Array.isArray(data.gallery)) {
//       data.gallery.forEach((file: File) => formData.append('gallery[]', file));
//     }

//     // 🚀 Отправляем запрос
//     const res = await axios.post(
//       `${process.env.NEXT_PUBLIC_API_URL}/api/companies/store`,
//       formData,
//       {
//         withCredentials: true,
//         headers: {
//           Accept: 'application/json',
//           // ⚠️ Content-Type не указываем — axios сам выставит boundary
//         },
//       }
//     );

//     // ✅ Проверяем статус
//     if (!res.data?.status) {
//       throw new Error(res.data?.message || 'Не удалось создать компанию');
//     }

//     return res.data;
//   } catch (err: any) {
//     console.error('🚨 Ошибка запроса fetchStoreCompany:', err);
//     throw new Error(
//       err.response?.data?.message ||
//         err.message ||
//         'Ошибка при сохранении компании'
//     );
//   }
// };
