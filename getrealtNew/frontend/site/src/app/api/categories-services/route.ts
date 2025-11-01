import { ResponseCategoriesServicesSchema } from '@/types';
import { NextResponse } from 'next/server';
import { API_URL, FRONTEND_TOKEN } from '../config';

export async function GET() {
  try {
    const res = await fetch(`${API_URL}/service-categories`, {
      headers: {
        Accept: 'application/json',
        'X-Frontend-Token': FRONTEND_TOKEN,
      },
      credentials: 'include',
      cache: 'no-store',
    });

    if (!res.ok) {
      const text = await res.text();
      return new NextResponse(text, { status: res.status });
    }

    const data = await res.json();

    const parsed = ResponseCategoriesServicesSchema.parse(data);

    return NextResponse.json(parsed);
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Неизвестная ошибка' }, { status: 500 });
  }
}
