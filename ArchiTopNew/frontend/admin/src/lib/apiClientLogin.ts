import { ZodSchema } from 'zod';

const baseUrl =
  typeof window === 'undefined'
    ? process.env.NEXT_PUBLIC_SITE_URL // SSR
    : '';
// const baseUrl = process.env.NEXT_ADMIN_URL;

export async function requestLogin<T>(path: string, schema: ZodSchema<T>, options?: RequestInit): Promise<T> {
  const url = `${baseUrl}${path.startsWith('/api') ? path : `/api${path}`}`;
  // console.log('Запрос к API:', url);

  const res = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options?.headers ?? {}),
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
