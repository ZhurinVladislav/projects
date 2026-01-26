import { API_URL, FRONTEND_TOKEN } from '@/app/api/config';
import { ResponseCompanySchema } from '@/types';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const token = request.cookies.get('admin_token')?.value;
    const { id } = await context.params;

    if (!token) {
      return NextResponse.json({ error: 'Не авторизован' }, { status: 401 });
    }

    const supportsDuplex = typeof process !== 'undefined' && !!process.version;

    const body = await request.formData();
    // console.log('🧾 FormData:', Object.fromEntries(body.entries()));

    // ✅ Вместо прямого PUT используем POST с _method=PUT
    const fetchOptions: RequestInit & { duplex?: 'half' } = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'X-Frontend-Token': FRONTEND_TOKEN,
      },
      body: body,
      // 👇 duplex добавляем только в среде Node.js
      ...(supportsDuplex ? { duplex: 'half' as const } : {}),
    };

    // Laravel воспримет это как PUT-запрос
    const response = await fetch(`${API_URL}/companies/${id}`, fetchOptions);

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({ error: data.message || 'Ошибка авторизации на сервере' }, { status: response.status });
    }

    const validated = ResponseCompanySchema.parse(data);

    return NextResponse.json(validated);
  } catch (error) {
    console.error('Ошибка при обновлении компании:', error);
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Неизвестная ошибка' }, { status: 500 });
  }
}
