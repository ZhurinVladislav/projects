import { ResponseCompanySchema } from '@/types';
import { NextRequest, NextResponse } from 'next/server';
import { API_URL, FRONTEND_TOKEN } from '../../config';

// export async function POST(request: NextRequest) {
//   try {
//     const token = request.cookies.get('admin_token')?.value;

//     if (!token) {
//       return NextResponse.json({ error: 'Не авторизован' }, { status: 401 });
//     }

//     // console.log('📡 Отправляем на API:', `${API_URL}/companies`);

//     // Проверим, можем ли использовать duplex (только в Node.js среде)
//     const supportsDuplex = typeof process !== 'undefined' && !!process.version;

//     const body = await request.formData();
//     // console.log('📡 Data:', body);

//     // Формируем объект запроса
//     const fetchOptions: RequestInit & { duplex?: 'half' } = {
//       method: 'POST',
//       headers: {
//         Authorization: `Bearer ${token}`,
//         'X-Frontend-Token': FRONTEND_TOKEN,
//       },
//       body: body,
//       // 👇 duplex добавляем только в среде Node.js
//       ...(supportsDuplex ? { duplex: 'half' as const } : {}),
//     };

//     const response = await fetch(`${API_URL}/companies`, fetchOptions);
//     console.log(response);

//     const data = await response.json();

//     if (!response.ok) {
//       return NextResponse.json({ error: data.message || 'Ошибка авторизации на сервере' }, { status: response.status });
//     }

//     const validated = ResponseCompanySchema.parse(data);

//     return NextResponse.json(validated);
//   } catch (error) {
//     console.error('🚨 Ошибка создания компании:', error);
//     return NextResponse.json({ error: error instanceof Error ? error.message : 'Неизвестная ошибка' }, { status: 400 });
//   }
// }

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get('admin_token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Не авторизован' }, { status: 401 });
    }

    // Проверим, можем ли использовать duplex (только в Node.js среде)
    const supportsDuplex = typeof process !== 'undefined' && !!process.version;

    const body = await request.formData();

    // Формируем объект запроса
    const fetchOptions: RequestInit & { duplex?: 'half' } = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'X-Frontend-Token': FRONTEND_TOKEN,
      },
      body: body,
      // 👇 duplex добавляем только в среде Node.js
      ...(supportsDuplex ? { duplex: 'half' as const } : {}),
    };

    const response = await fetch(`${API_URL}/companies`, fetchOptions);

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({ error: data.message || 'Ошибка авторизации на сервере' }, { status: response.status });
    }

    const validated = ResponseCompanySchema.parse(data);

    return NextResponse.json(validated);
  } catch (error) {
    console.error('Ошибка создания компании:', error);
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Неизвестная ошибка' }, { status: 400 });
  }
}
