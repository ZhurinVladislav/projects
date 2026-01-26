import { API_URL, FRONTEND_TOKEN } from '@/app/api/config';
import { ResponseDeleteCategoriesServicesSchema } from '@/types/CategoryServices/type';
import { NextRequest, NextResponse } from 'next/server';

// Явно указываем, что маршрут динамический
export const dynamic = 'force-dynamic';

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const token = request.cookies.get('admin_token')?.value;
    const { id } = await params;

    if (!token) {
      return NextResponse.json({ success: false, message: 'Не авторизован' }, { status: 401 });
    }

    const response = await fetch(`${API_URL}/service-categories/${id}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
        'X-Frontend-Token': FRONTEND_TOKEN,
      },
      credentials: 'include',
      cache: 'no-store',
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({ success: false, message: data.message || 'Ошибка удаления' }, { status: response.status });
    }

    const validated = ResponseDeleteCategoriesServicesSchema.parse(data);

    return NextResponse.json(validated);
  } catch (error) {
    console.error('Ошибка удаления страницы:', error);
    return NextResponse.json({ success: false, message: 'Ошибка на сервере' }, { status: 500 });
  }
}
