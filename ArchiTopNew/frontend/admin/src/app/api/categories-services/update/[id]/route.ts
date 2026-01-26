import { API_URL, FRONTEND_TOKEN } from '@/app/api/config';
import { ResponseCategoriesServicesSchema } from '@/types/CategoryServices/type';
import { NextRequest, NextResponse } from 'next/server';

// export const dynamic = 'force-dynamic'; // можно включить при необходимости

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const token = request.cookies.get('admin_token')?.value;
    const { id } = await params;

    if (!token) {
      return NextResponse.json({ error: 'Не авторизован' }, { status: 401 });
    }

    const body = await request.json();

    const response = await fetch(`${API_URL}/service-categories/${id}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        'X-Frontend-Token': FRONTEND_TOKEN,
      },
      body: JSON.stringify(body),
      credentials: 'include',
      cache: 'no-store',
    });

    if (!response.ok) {
      const text = await response.text();
      return new NextResponse(text, { status: response.status });
    }

    const data = await response.json();

    const parsed = ResponseCategoriesServicesSchema.parse(data);

    return NextResponse.json(parsed);
  } catch (error) {
    console.error('Ошибка при обновлении страницы:', error);
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Неизвестная ошибка' }, { status: 500 });
  }
}
