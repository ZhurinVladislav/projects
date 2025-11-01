// import { ZodSchema } from 'zod';

// const getBaseUrl = (): string => {
//   if (process.env.NODE_ENV === 'production') {
//     return process.env.NEXT_PUBLIC_SITE_URL || '';
//   }
//   return ''; // dev/build - относительные пути
// };

// // Клиентская версия
// export async function request<T>(path: string, schema: ZodSchema<T>, options?: RequestInit & { next?: { revalidate?: number } }): Promise<T> {
//   const baseUrl = getBaseUrl();
//   const url = `${baseUrl}${path.startsWith('/api') ? path : `/api${path}`}`;

//   // ✅ Логирование для отладки
//   if (process.env.NODE_ENV === 'development') {
//     console.log('📡 Client request:', url);
//   }

//   const res = await fetch(url, {
//     ...options,
//     headers: {
//       'Content-Type': 'application/json',
//       ...(options?.headers ?? {}),
//     },
//     credentials: 'include',
//     // ✅ Условный next только для client
//     ...(typeof window !== 'undefined' && options?.next ? { next: options.next } : {}),
//   });

//   if (!res.ok) {
//     let errorText = `HTTP ${res.status}: ${res.statusText}`;
//     try {
//       const errorData = await res.json();
//       errorText = errorData.message || errorText;
//     } catch {}
//     throw new Error(errorText);
//   }

//   const contentType = res.headers.get('content-type');
//   const data = contentType?.includes('application/json') ? await res.json() : null;
//   return schema.parse(data);
// }

// // ✅ Серверная версия (только для Server Components)
// export async function serverRequest<T>(path: string, schema: ZodSchema<T>, options?: RequestInit & { next?: { revalidate?: number } }): Promise<T> {
//   const baseUrl = getBaseUrl();
//   const url = `${baseUrl}${path.startsWith('/api') ? path : `/api${path}`}`;

//   try {
//     const { headers } = await import('next/headers');
//     const nextHeaders = await headers();
//     const forwardedHeaders = ['cookie', 'authorization'];
//     const serverHeaders = Object.fromEntries(Array.from(nextHeaders.entries()).filter(([key]) => forwardedHeaders.includes(key.toLowerCase())));

//     const res = await fetch(url, {
//       ...options,
//       headers: {
//         'Content-Type': 'application/json',
//         ...serverHeaders,
//         ...(options?.headers ?? {}),
//       },
//       credentials: 'include',
//       // ✅ next работает только в server components
//       ...(options?.next ? { next: options.next } : {}),
//     });

//     if (!res.ok) {
//       let errorText = `HTTP ${res.status}: ${res.statusText}`;
//       try {
//         const errorData = await res.json();
//         errorText = errorData.message || errorText;
//       } catch {}
//       throw new Error(errorText);
//     }

//     const data = await res.json();
//     return schema.parse(data);
//   } catch (error) {
//     // ✅ Fallback для build-time
//     if (process.env.NODE_ENV === 'production' && typeof window === 'undefined') {
//       console.warn(`Build-time fetch failed: ${url}`, error);
//       return schema.parse({}); // или ваш fallback
//     }
//     throw error;
//   }
// }

import { ZodSchema } from 'zod';

export type ValidPageSlug = 'about-us' | 'services' | 'contacts' | 'news' | 'companies' | string; // или более строгий union тип

// Функция валидации
export function isValidPageSlug(slug: string): boolean {
  // Запрещаем расширения файлов
  if (/\.(svg|ico|png|jpg|jpeg|gif|webp|pdf|txt|xml|css|js)$/.test(slug)) {
    return false;
  }

  // Запрещаем системные пути
  const forbidden = ['admin', 'api', '_next', 'favicon', 'robots', 'sitemap'];
  if (forbidden.some(f => slug.toLowerCase().startsWith(f))) {
    return false;
  }

  // Запрещаем относительные пути
  if (slug.includes('..') || slug.includes('//')) {
    return false;
  }

  // Минимум 2 символа, только буквы, цифры, дефисы, подчеркивания
  if (!/^[a-zA-Z0-9\-_]{2,}$/.test(slug.replace('/', ''))) {
    return false;
  }

  return true;
}

const baseUrl =
  typeof window === 'undefined'
    ? process.env.NEXT_PUBLIC_SITE_URL // SSR
    : '';

// export async function request<T>(path: string, schema: ZodSchema<T>, options?: RequestInit): Promise<T> {
//   const url = `${baseUrl}/api${path}`; // <-- обязательно /api
//   // console.log('Запрос к API:', url);

//   const res = await fetch(url, {
//     ...options,
//     headers: {
//       'Content-Type': 'application/json',
//       ...(options?.headers ?? {}),
//     },
//     next: { revalidate: 60 },
//   });

//   if (!res.ok) {
//     throw new Error(`HTTP ${res.status}: ${await res.text()}`);
//   }

//   const data = await res.json();
//   return schema.parse(data);
// }

// Клиентская версия request (без next/headers)

export async function request<T>(path: string, schema: ZodSchema<T>, options?: RequestInit & { next?: { revalidate?: number } }): Promise<T> {
  const url = `${baseUrl}${path.startsWith('/api') ? path : `/api${path}`}`;
  // console.log('📡 Клиентский запрос к API:', url);

  const res = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options?.headers ?? {}),
    },
    credentials: 'include',
    next: {
      revalidate: options?.next?.revalidate ?? 60,
    },
  });

  if (!res.ok) {
    let errorText = `HTTP ${res.status}: ${res.statusText}`;

    // if (errorText === 'HTTP 404: Not Found');

    try {
      const errorData = await res.json();
      errorText = errorData.message || errorText;
    } catch {}
    throw new Error(errorText);
  }

  const contentType = res.headers.get('content-type');
  const data = contentType?.includes('application/json') ? await res.json() : null;

  return schema.parse(data);
}

// Серверная версия request (с next/headers)
export async function serverRequest<T>(path: string, schema: ZodSchema<T>, options?: RequestInit & { next?: { revalidate?: number } }): Promise<T> {
  const url = `${baseUrl}${path.startsWith('/api') ? path : `/api${path}`}`;

  // Безопасный форвардинг нужных заголовков
  const { headers } = await import('next/headers');
  const nextHeaders = await headers();
  const forwardedHeaders = ['cookie', 'authorization'];
  const serverHeaders = Object.fromEntries(Array.from(nextHeaders.entries()).filter(([key]) => forwardedHeaders.includes(key.toLowerCase())));

  const res = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options?.headers ?? {}),
      ...serverHeaders,
    },
    credentials: 'include',
    next: {
      revalidate: options?.next?.revalidate ?? 60, // ✅ не затираем значение
    },
  });

  if (!res.ok) {
    let errorText = `HTTP ${res.status}: ${res.statusText}`;
    try {
      const errorData = await res.json();
      errorText = errorData.message || errorText;
    } catch {}
    throw new Error(errorText);
  }

  const data = await res.json();
  return schema.parse(data);
}

// export const Api = {
//   fetchGetPosts: () => request('/posts', FetchPostsSchema),
// };
