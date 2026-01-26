// import { FetchPagesSchema } from '@/types/pages/types';
// import { NextRequest, NextResponse } from 'next/server';
// import { API_URL, FRONTEND_TOKEN } from '../config';

// export async function GET(request: NextRequest) {
//   try {
//     const token = request.cookies.get('admin_token')?.value;
//     // const token = '14|A7oWGy1rUJlRZAKYqkk36hvJYmkeBii2pDPveImt704ce64f';
//     console.log('🔑 admin_token из cookies:', token);

//     console.log(request);

//     if (!token) {
//       // console.log('⚠️ Куки admin_token не найдено');
//       return NextResponse.json({ error: 'Не авторизован' }, { status: 401 });
//     }

//     const res = await fetch(`${API_URL}/pages`, {
//       headers: {
//         Accept: 'application/json',
//         Authorization: `Bearer ${token}`,
//         'X-Frontend-Token': FRONTEND_TOKEN,
//       },
//       cache: 'no-store',
//     });

//     // console.log('📡 Запрос к Laravel:', `${API_URL}/pages`);
//     // console.log('📦 Заголовки:', {
//     //   Authorization: `Bearer ${token}`,
//     //   'X-Frontend-Token': FRONTEND_TOKEN,
//     // });

//     if (!res.ok) {
//       const text = await res.text();
//       // console.log('❌ Ответ Laravel:', text);
//       return new NextResponse(text, { status: res.status });
//     }

//     const data = await res.json();
//     // console.log('✅ Ответ Laravel:', data);

//     const parsed = FetchPagesSchema.parse(data);
//     return NextResponse.json(parsed);
//   } catch (error) {
//     // console.error('Ошибка /api/pages:', error);
//     return NextResponse.json({ error: error instanceof Error ? error.message : 'Неизвестная ошибка' }, { status: 500 });
//   }
// }

import { FetchPagesSchema } from '@/types/pages/types';
import { NextRequest, NextResponse } from 'next/server';
import { API_URL, FRONTEND_TOKEN } from '../config';

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('admin_token')?.value;
    // console.log('🔑 admin_token из cookies:', token);
    // console.log('🍪 Все куки:', request.cookies.getAll());

    if (!token) {
      // console.log('⚠️ Куки admin_token не найдено');
      return NextResponse.json({ error: 'Не авторизован' }, { status: 401 });
    }

    const res = await fetch(`${API_URL}/pages`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
        'X-Frontend-Token': FRONTEND_TOKEN,
      },
      credentials: 'include', // Включаем куки
      cache: 'no-store',
    });

    if (!res.ok) {
      const text = await res.text();
      // console.log('❌ Ответ Laravel:', text);
      return new NextResponse(text, { status: res.status });
    }

    const data = await res.json();

    // console.log('✅ Ответ Laravel:', data);

    const parsed = FetchPagesSchema.parse(data);
    return NextResponse.json(parsed);
  } catch (error) {
    // console.error('❌ Ошибка /api/pages:', error);
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Неизвестная ошибка' }, { status: 500 });
  }
}
