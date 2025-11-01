import { RequestCategoryServicesSchema, ResponseCategoriesServicesSchema } from '@/types/CategoryServices/type';
import { NextRequest, NextResponse } from 'next/server';
import { API_URL, FRONTEND_TOKEN } from '../../config';

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get('admin_token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Не авторизован' }, { status: 401 });
    }

    const body = await request.json();
    const parsed = RequestCategoryServicesSchema.parse(body);

    const response = await fetch(`${API_URL}/service-categories`, {
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

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({ error: data.message || 'Ошибка авторизации на сервере' }, { status: response.status });
    }

    const validated = ResponseCategoriesServicesSchema.parse(data);

    return NextResponse.json(validated);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Неизвестная ошибка авторизации';
    console.error('Ошибка удаления страницы:', error);
    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
}
