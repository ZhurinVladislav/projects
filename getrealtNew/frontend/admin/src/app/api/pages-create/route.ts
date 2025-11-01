import { PageRequestSchema, PageResponseSchema } from '@/types/pages/types';
import { NextRequest, NextResponse } from 'next/server';
import { API_URL, FRONTEND_TOKEN } from '../config';

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get('admin_token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Не авторизован' }, { status: 401 });
    }

    const body = await request.json();
    const parsed = PageRequestSchema.parse(body);

    const res = await fetch(`${API_URL}/pages`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        'X-Frontend-Token': FRONTEND_TOKEN,
      },
      body: JSON.stringify(parsed),
      credentials: 'include',
      cache: 'no-store',
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json({ error: data.message || 'Ошибка авторизации на сервере' }, { status: res.status });
    }

    const validated = PageResponseSchema.parse(data);

    const response = NextResponse.json(validated);

    return response;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Неизвестная ошибка авторизации';
    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
}
