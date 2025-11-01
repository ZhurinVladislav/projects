import { API_URL, FRONTEND_TOKEN } from '@/app/api/config';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const token = req.cookies.get('admin_token')?.value;
    const { id } = await params;

    if (!token) {
      return NextResponse.json({ success: false, message: 'Не авторизован' }, { status: 401 });
    }

    const apiRes = await fetch(`${API_URL}/pages/${id}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        'X-Frontend-Token': FRONTEND_TOKEN,
      },
    });

    const data = await apiRes.json();

    if (!apiRes.ok) {
      return NextResponse.json({ success: false, message: data.message || 'Ошибка удаления' }, { status: apiRes.status });
    }

    return NextResponse.json({ success: true, message: 'Страница успешно удалена' });
  } catch (error) {
    console.error('Ошибка удаления страницы:', error);
    return NextResponse.json({ success: false, message: 'Ошибка на сервере' }, { status: 500 });
  }
}
