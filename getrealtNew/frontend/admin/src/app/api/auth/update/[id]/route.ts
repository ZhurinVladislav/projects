import { API_URL, FRONTEND_TOKEN } from '@/app/api/config';
import { FetchUserSchema } from '@/types';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const token = request.cookies.get('admin_token')?.value;
    const { id } = await context.params;

    if (!token) {
      return NextResponse.json({ error: 'Не авторизован' }, { status: 401 });
    }

    const body = await request.json();

    // Валидация тела запроса
    const parsed = FetchUserSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ errors: parsed.error.flatten().fieldErrors }, { status: 422 });
    }

    console.log(parsed.data);

    // Проксируем запрос к внешнему API
    const res = await fetch(`${API_URL}/user/update`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        'X-Frontend-Token': FRONTEND_TOKEN,
      },
      body: JSON.stringify(parsed.data),
      cache: 'no-store',
      credentials: 'include',
    });

    if (!res.ok) {
      const text = await res.text();
      return new NextResponse(text, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Ошибка при обновлении пользователя:', error);
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Неизвестная ошибка' }, { status: 500 });
  }
}
