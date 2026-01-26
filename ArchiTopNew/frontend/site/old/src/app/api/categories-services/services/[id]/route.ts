import { API_URL, FRONTEND_TOKEN } from '@/app/api/config';
import { ResponseServicesSchema } from '@/types';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id: idString } = await params;
    const id = Number(idString);

    const res = await fetch(`${API_URL}/service-categories/page/${id}`, {
      headers: {
        Accept: 'application/json',
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

    const parsed = ResponseServicesSchema.parse(data);
    return NextResponse.json(parsed);
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Неизвестная ошибка' }, { status: 500 });
  }
}
