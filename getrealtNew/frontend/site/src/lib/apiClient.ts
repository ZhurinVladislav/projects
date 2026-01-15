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
