import { ResponsePageSchema } from '@/types';
import { NextResponse } from 'next/server';
import { API_URL, FRONTEND_TOKEN } from '../../config';

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const slugPath = slug?.join('/') || '';

  // ⚠️ Пропускаем статику
  if (/\.(png|jpg|jpeg|svg|webp|gif|ico|json|xml|txt|map)$/i.test(slugPath)) {
    return NextResponse.json({ status: false, message: 'Static path skipped' });
  }

  try {
    const res = await fetch(`${API_URL}/pages/alias/${slugPath}`, {
      headers: {
        Accept: 'application/json',
        'X-Frontend-Token': FRONTEND_TOKEN,
      },
      cache: 'no-store',
    });

    if (!res.ok) {
      const text = await res.text();
      return new NextResponse(text, { status: res.status });
    }

    const data = await res.json();
    const parsed = ResponsePageSchema.parse(data);

    return NextResponse.json(parsed);
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Неизвестная ошибка' }, { status: 500 });
  }
}
