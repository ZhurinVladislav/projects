import { ResponseServicesSchema } from '@/types';
import { NextResponse } from 'next/server';
import { API_URL, FRONTEND_TOKEN } from '../config';

export async function GET() {
  try {
    const res = await fetch(`${API_URL}/services`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'X-Frontend-Token': FRONTEND_TOKEN,
      },
      credentials: 'include',
      cache: 'no-store',
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json({ error: data.message || 'Ошибка авторизации на сервере' }, { status: res.status });
    }

    const validated = ResponseServicesSchema.parse(data);

    return NextResponse.json(validated);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Неизвестная ошибка авторизации';
    console.error('Ошибка удаления страницы:', error);
    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
}
