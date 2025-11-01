import { FetchPostsSchema } from '@/types';
import { NextResponse } from 'next/server';
import { API_URL, FRONTEND_TOKEN } from '../config';

export async function GET() {
  try {
    const res = await fetch(`${API_URL}/posts`, {
      headers: {
        Accept: 'application/json',
        'X-Frontend-Token': FRONTEND_TOKEN, // клиент не увидит
      },
    });

    if (!res.ok) {
      return new NextResponse(await res.text(), { status: res.status });
    }

    const data = await res.json();
    const parsed = FetchPostsSchema.parse(data);

    return NextResponse.json(parsed);
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Неизвестная ошибка' }, { status: 500 });
  }
}
