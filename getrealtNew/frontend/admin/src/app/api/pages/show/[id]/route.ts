import { API_URL, FRONTEND_TOKEN } from '@/app/api/config';
import { FetchPageSchema } from '@/types/pages/types';
import { NextRequest, NextResponse } from 'next/server';

// Явно указываем, что маршрут динамический
// export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const token = request.cookies.get('admin_token')?.value;
    const { id } = await params;

    if (!token) {
      return NextResponse.json({ error: 'Не авторизован' }, { status: 401 });
    }

    const res = await fetch(`${API_URL}/pages/${id}`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
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

    const parsed = FetchPageSchema.parse(data);
    return NextResponse.json(parsed);
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Неизвестная ошибка' }, { status: 500 });
  }
}
