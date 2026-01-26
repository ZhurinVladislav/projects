// import { FetchPostsSchema, TFetchPosts } from '@/types';
// import { API_URL } from '../config';
// import { validateResponse } from '../validateResponse';

import { request } from '@/lib/apiClient';
import { FetchPostsSchema } from '@/types';

// export const fetchGetPosts = async (): Promise<TFetchPosts> => {
//   const url: string = `${API_URL}/posts`;

//   return await fetch(url, {
//     // method: 'GET',
//     // credentials: 'include',
//     headers: {
//       Accept: 'application/json',
//       'Content-Type': 'application/json',
//     },
//     next: { revalidate: 60 },
//   })
//     .then(validateResponse)
//     .then(response => response.json())
//     .then(data => FetchPostsSchema.parse(data));
// };

// export async function fetchGetPosts() {
//   const res = await fetch(`${API_URL}/posts`, {
//     method: 'GET',
//     headers: {
//       Accept: 'application/json',
//       'Content-Type': 'application/json',
//       'X-Frontend-Token': FRONTEND_TOKEN,
//     },
//     next: { revalidate: 60 }, // ISR
//   });

//   if (!res.ok) {
//     const text = await res.text();
//     throw new Error(`HTTP ${res.status}: ${text}`);
//   }

//   return res.json();
// }

// import { z } from 'zod';

// export type FetchPostsType = z.infer<typeof FetchPostsSchema>;

// export async function fetchGetPosts(): Promise<FetchPostsType> {
//   const res = await fetch('/api/posts', {
//     method: 'GET',
//     next: { revalidate: 60 }, // ISR
//   });

//   if (!res.ok) {
//     const err = await res.json().catch(() => ({}));
//     throw new Error(`HTTP ${res.status}: ${err?.error ?? 'Неизвестная ошибка'}`);
//   }

//   const data = await res.json();
//   return FetchPostsSchema.parse(data);
// }

// Определяем базовый URL для API (всегда указывает на Next.js)
// const baseUrl =
//   typeof window === 'undefined'
//     ? process.env.NEXT_PUBLIC_SITE_URL // SSR
//     : ''; // на клиенте можно использовать относительный путь `/api/...`

export const fetchGetPosts = async () => request('/posts', FetchPostsSchema);

//  export async const fetchGetPosts = () => {
//     const res = await fetch(`${baseUrl}/api/posts`, {
//       next: { revalidate: 60 }, // ISR
//     });

//     if (!res.ok) {
//       throw new Error(`HTTP ${res.status}`);
//     }

//     const data = await res.json();
//     return FetchPostsSchema.parse(data);
//   },

// export const fetchGetPosts = async (): Promise<TFetchPosts> => {
//   const res = await fetch(`${baseUrl}/api/posts`, {
//     next: { revalidate: 60 }, // ISR
//   });
//   if (!res.ok) {
//     throw new Error(`HTTP ${res.status}`);
//   }
//   const data = await res.json();
//   return FetchPostsSchema.parse(data);
// };
