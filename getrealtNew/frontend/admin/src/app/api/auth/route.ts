// import { LoginRequestSchema, LoginResponseSchema } from '@/types/auth/types';
// import { NextResponse } from 'next/server';
// import { API_URL, FRONTEND_TOKEN } from '../config';

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();
//     const parsed = LoginRequestSchema.parse(body); // Валидация входных данных (login, password)

//     const res = await fetch(`${API_URL}/login`, {
//       method: 'POST',
//       headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json',
//         'X-Frontend-Token': FRONTEND_TOKEN,
//       },
//       body: JSON.stringify(parsed),
//     });

//     const data = await res.json();
//     if (!res.ok) {
//       // Возвращаем точное сообщение об ошибке от бэкенда
//       return NextResponse.json({ error: data.message || 'Ошибка авторизации на сервере' }, { status: res.status });
//     }

//     const validated = LoginResponseSchema.parse(data); // Валидация ответа (status, message, token, user)

//     // Устанавливаем cookie
//     const response = NextResponse.json(validated);
//     response.cookies.set('admin_token', validated.data.token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === 'production',
//       path: '/',
//       sameSite: 'lax',
//       maxAge: 60 * 60 * 24 * 7, // 7 дней
//     });

//     return response;
//   } catch (error) {
//     // Безопасное логирование без вывода чувствительных данных
//     const errorMessage = error instanceof Error ? error.message : 'Неизвестная ошибка авторизации';
//     console.error('Ошибка логина:', errorMessage);
//     return NextResponse.json({ error: errorMessage }, { status: 400 });
//   }
// }

// import { LoginRequestSchema, LoginResponseSchema } from '@/types/auth/types';
// import { NextResponse } from 'next/server';
// import { API_URL, FRONTEND_TOKEN } from '../config';

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();
//     const parsed = LoginRequestSchema.parse(body);
//     console.log('📩 Входные данные:', parsed); // Логируем входные данные

//     const res = await fetch(`${API_URL}/login`, {
//       method: 'POST',
//       headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json',
//         'X-Frontend-Token': FRONTEND_TOKEN,
//       },
//       body: JSON.stringify(parsed),
//     });

//     const data = await res.json();
//     console.log('📡 Ответ Laravel:', data); // Логируем ответ Laravel

//     if (!res.ok) {
//       return NextResponse.json({ error: data.message || 'Ошибка авторизации на сервере' }, { status: res.status });
//     }

//     const validated = LoginResponseSchema.parse(data);
//     console.log('✅ Валидированный ответ:', validated);

//     // Устанавливаем cookie
//     const response = NextResponse.json(validated);
//     // response.cookies.set('admin_token', validated.data.token, {
//     //   // httpOnly: true,
//     //   httpOnly: false,
//     //   // secure: process.env.NODE_ENV === 'production',
//     //   secure: false, // временно для localhost
//     //   path: '/',
//     //   sameSite: 'lax',
//     //   maxAge: 60 * 60 * 24 * 7,
//     // });

//     response.cookies.set('admin_token', validated.data.token, {
//       httpOnly: true,
//       secure: false, // локально HTTP
//       path: '/',
//       domain: 'localhost', // cookie доступно на IP сервера
//       sameSite: 'lax',
//       maxAge: 60 * 60 * 24 * 7,
//     });

//     console.log('🍪 Куки установлено:', {
//       name: 'admin_token',
//       value: validated.data.token,
//     });

//     return response;
//   } catch (error) {
//     const errorMessage = error instanceof Error ? error.message : 'Неизвестная ошибка авторизации';
//     console.error('❌ Ошибка логина:', errorMessage);
//     return NextResponse.json({ error: errorMessage }, { status: 400 });
//   }
// }

import { RequestLoginSchema, ResponseUserSchema } from '@/types';
import { NextResponse } from 'next/server';
import { API_URL, FRONTEND_TOKEN } from '../config';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = RequestLoginSchema.parse(body);
    // console.log('📩 Входные данные:', parsed);

    const res = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Frontend-Token': FRONTEND_TOKEN,
      },
      body: JSON.stringify(parsed),
      credentials: 'include', // Включаем куки в запрос
    });

    const data = await res.json();
    // console.log('📡 Ответ Laravel:', data);

    if (!res.ok) {
      return NextResponse.json({ error: data.message || 'Ошибка авторизации на сервере' }, { status: res.status });
    }

    const validated = ResponseUserSchema.parse(data);

    // console.log(validated);

    // console.log('✅ Валидированный ответ:', validated);

    const response = NextResponse.json(validated);
    response.cookies.set('admin_token', validated.data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // true в продакшене
      path: '/',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
    });

    // console.log('🍪 Куки установлено:', response.cookies.get('admin_token'));
    return response;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Неизвестная ошибка авторизации';
    // console.error('❌ Ошибка логина:', errorMessage);
    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
}
