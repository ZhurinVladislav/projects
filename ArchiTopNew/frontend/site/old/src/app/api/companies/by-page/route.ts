import { API_URL, FRONTEND_TOKEN } from '@/app/api/config';
import { ResponseCompaniesNotAliasSchema } from '@/types';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    // читаем параметры
    const queryString = new URL(req.url).searchParams.toString();

    const res = await fetch(`${API_URL}/companies/by-page?${queryString}`, {
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

    const parsed = ResponseCompaniesNotAliasSchema.parse(data);

    return NextResponse.json(parsed);
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Неизвестная ошибка' }, { status: 500 });
  }
}
