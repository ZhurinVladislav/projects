import { API_URL, FRONTEND_TOKEN } from '@/app/api/config';
import { ResponseServiceSchema } from '@/types/Service/type';
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

    const response = await fetch(`${API_URL}/services/${id}`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
        'X-Frontend-Token': FRONTEND_TOKEN,
      },
      credentials: 'include',
      cache: 'no-store',
    });

    if (!response.ok) {
      const text = await response.text();

      return new NextResponse(text, { status: response.status });
    }

    const data = await response.json();

    const parsed = ResponseServiceSchema.parse(data);

    return NextResponse.json(parsed);
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Неизвестная ошибка' }, { status: 500 });
  }
}
