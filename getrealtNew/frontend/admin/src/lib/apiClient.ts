// import { ZodSchema } from 'zod';

// const baseUrl =
//   typeof window === 'undefined'
//     ? process.env.NEXT_PUBLIC_SITE_URL // SSR
//     : '';
// // const baseUrl = process.env.NEXT_ADMIN_URL;

// export async function request<T>(path: string, schema: ZodSchema<T>, options?: RequestInit): Promise<T> {
//   const url = `${baseUrl}${path.startsWith('/api') ? path : `/api${path}`}`;
//   // console.log('Запрос к API:', url);

//   const res = await fetch(url, {
//     ...options,
//     headers: {
//       'Content-Type': 'application/json',
//       ...(options?.headers ?? {}),
//     },
//     credentials: 'include',
//     next: { revalidate: 60 },
//   });

//   if (!res.ok) {
//     throw new Error(`HTTP ${res.status}: ${res.statusText}`);
//   }

//   const data = await res.json();

//   return schema.parse(data);
// }

// import { headers } from 'next/headers';
// import { ZodSchema } from 'zod';

// const baseUrl =
//   typeof window === 'undefined'
//     ? process.env.NEXT_PUBLIC_SITE_URL // SSR
//     : '';

// export async function request<T>(path: string, schema: ZodSchema<T>, options?: RequestInit): Promise<T> {
//   const url = `${baseUrl}${path.startsWith('/api') ? path : `/api${path}`}`;
//   // console.log('Запрос к API:', url);

//   // Форвардинг headers на сервере
//   let serverHeaders = {};
//   if (typeof window === 'undefined') {
//     const nextHeaders = await headers();
//     serverHeaders = Object.fromEntries(nextHeaders.entries());
//     // console.log('📤 Форвардинг серверных headers:', serverHeaders); // Лог для отладки
//   }

//   const res = await fetch(url, {
//     ...options,
//     headers: {
//       'Content-Type': 'application/json',
//       ...(options?.headers ?? {}),
//       ...serverHeaders, // Добавляем форвардинг headers (включая Cookie)
//     },
//     credentials: 'include',
//     next: { revalidate: 60 },
//   });

//   if (!res.ok) {
//     throw new Error(`HTTP ${res.status}: ${res.statusText}`);
//   }

//   const data = await res.json();
//   return schema.parse(data);
// }

// import { ZodSchema } from 'zod';

// // Базовый URL для запросов
// const baseUrl =
//   typeof window === 'undefined'
//     ? process.env.NEXT_PUBLIC_SITE_URL // SSR
//     : '';

// // Клиентская версия request (без next/headers)
// export async function request<T>(path: string, schema: ZodSchema<T>, options?: RequestInit): Promise<T> {
//   const url = `${baseUrl}${path.startsWith('/api') ? path : `/api${path}`}`;
//   console.log('Запрос к API:', url);

//   const res = await fetch(url, {
//     ...options,
//     headers: {
//       'Content-Type': 'application/json',
//       ...(options?.headers ?? {}),
//     },
//     credentials: 'include', // Отправляем куки в клиентском контексте
//     next: { revalidate: 60 },
//   });

//   if (!res.ok) {
//     throw new Error(`HTTP ${res.status}: ${res.statusText}`);
//   }

//   const data = await res.json();
//   return schema.parse(data);
// }

//...

/**
 * Универсальный клиентский запрос:
 * Автоматически различает JSON и FormData, корректно передаёт куки.
 */
// export async function request<T>(path: string, schema: ZodSchema<T>, options?: RequestInit & { isFormData?: boolean }): Promise<T> {
//   const url = `${baseUrl}${path.startsWith('/api') ? path : `/api${path}`}`;
//   const isFormData = options?.body instanceof FormData;

//   const headers: Record<string, string> = {};

//   // Добавляем Content-Type только если это НЕ FormData
//   if (!isFormData) {
//     headers['Content-Type'] = 'application/json';
//   }

//   const res = await fetch(url, {
//     ...options,
//     headers: {
//       ...headers,
//       ...(options?.headers ?? {}),
//     },
//     credentials: 'include',
//     next: { revalidate: 60 },
//   });

//   if (!res.ok) {
//     const text = await res.text();
//     throw new Error(`HTTP ${res.status}: ${text}`);
//   }

//   const data = await res.json();
//   return schema.parse(data);
// }

import { ZodSchema } from 'zod';

const baseUrl =
  typeof window === 'undefined'
    ? process.env.NEXT_PUBLIC_SITE_URL // SSR
    : '';

export async function requestFormData<T>(path: string, schema: ZodSchema<T>, options?: RequestInit & { isFormData?: boolean }): Promise<T> {
  const url = `${baseUrl}${path.startsWith('/api') ? path : `/api${path}`}`;

  const headers: Record<string, string> = {};

  if (!options?.isFormData) {
    headers['Content-Type'] = 'application/json';
  }

  const res = await fetch(url, {
    ...options,
    headers: {
      ...headers,
      ...(options?.headers ?? {}),
    },
    credentials: 'include',
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`HTTP ${res.status}: ${text}`);
  }

  const data = await res.json();
  return schema.parse(data);
}

// Клиентская версия request (без next/headers)
export async function request<T>(path: string, schema: ZodSchema<T>, options?: RequestInit): Promise<T> {
  const url = `${baseUrl}${path.startsWith('/api') ? path : `/api${path}`}`;
  console.log('Запрос к API:', url);

  const res = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options?.headers ?? {}),
    },
    credentials: 'include', // Отправляем куки в клиентском контексте
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}: ${res.statusText}`);
  }

  const data = await res.json();
  return schema.parse(data);
}

// Серверная версия request (с next/headers)
export async function serverRequest<T>(path: string, schema: ZodSchema<T>, options?: RequestInit): Promise<T> {
  const url = `${baseUrl}${path.startsWith('/api') ? path : `/api${path}`}`;
  // console.log('Запрос к API (сервер):', url);

  // Форвардинг headers на сервере
  const { headers } = await import('next/headers'); // Динамический импорт для избежания ошибок
  const nextHeaders = await headers();
  const serverHeaders = Object.fromEntries(nextHeaders.entries());
  // console.log('📤 Форвардинг серверных headers:', serverHeaders);

  const res = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options?.headers ?? {}),
      ...serverHeaders, // Добавляем форвардинг headers (включая Cookie)
    },
    credentials: 'include',
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}: ${res.statusText}`);
  }

  const data = await res.json();
  return schema.parse(data);
}

// function normalizeHeaders(input?: HeadersInit): Record<string, string> {
//   const headersObj: Record<string, string> = {};

//   if (!input) return headersObj;

//   if (input instanceof Headers) {
//     input.forEach((value, key) => (headersObj[key] = value));
//   } else if (Array.isArray(input)) {
//     input.forEach(([key, value]) => (headersObj[key] = value));
//   } else {
//     Object.assign(headersObj, input);
//   }

//   return headersObj;
// }

// export async function serverRequest<T>(path: string, schema: ZodSchema<T>, options?: RequestInit & { isFormData?: boolean }): Promise<T> {
//   const url = `${baseUrl}${path.startsWith('/api') ? path : `/api${path}`}`;
//   const isFormData = options?.body instanceof FormData;

//   const { headers } = await import('next/headers');
//   const nextHeaders = await headers();

//   const serverHeaders: Record<string, string> = {};
//   nextHeaders.forEach((value, key) => (serverHeaders[key] = value));

//   const normalizedClientHeaders = normalizeHeaders(options?.headers);

//   const finalHeaders: Record<string, string> = {
//     ...serverHeaders,
//     ...normalizedClientHeaders,
//   };

//   if (!isFormData) {
//     finalHeaders['Content-Type'] = 'application/json';
//   }

//   const res = await fetch(url, {
//     ...options,
//     headers: finalHeaders,
//     credentials: 'include',
//     next: { revalidate: 60 },
//   });

//   if (!res.ok) {
//     const text = await res.text();
//     throw new Error(`HTTP ${res.status}: ${text}`);
//   }

//   const data = await res.json();
//   return schema.parse(data);
// }
