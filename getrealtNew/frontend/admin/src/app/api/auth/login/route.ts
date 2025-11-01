import { NextResponse } from 'next/server';
import { FRONTEND_TOKEN } from '../../config';

const API_URL = process.env.NEXT_PUBLIC_API_URL!; // Laravel API

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const res = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Frontend-Token': FRONTEND_TOKEN,
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error('Ошибка логина Laravel:', text);
      return new NextResponse(text, { status: res.status });
    }

    const data = await res.json();

    // Проверим структуру ответа Laravel
    const token = data?.token || data?.data?.token || data?.access_token || data?.data?.access_token;

    if (!token) {
      console.error('⚠️ Токен не найден в ответе Laravel:', data);
      return NextResponse.json({ error: 'Токен не получен от API' }, { status: 400 });
    }

    // Формируем ответ
    const response = NextResponse.json({
      status: true,
      message: 'Вход выполнен успешно',
      user: data.user ?? data.data?.user ?? null,
    });

    // Настройка cookie
    response.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production' ? true : false,
      sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
      path: '/',
      // maxAge: 60 * 60 * 24, // (опционально) 1 день
    });

    console.log('✅ Кука admin_token установлена');

    return response;
  } catch (error) {
    console.error('Ошибка при логине:', error);
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Неизвестная ошибка' }, { status: 500 });
  }
}
