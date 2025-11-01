import { API_URL, FRONTEND_TOKEN } from '@/app/api/config';
import { ResponseCompaniesNotAliasSchema } from '@/types';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: number }> }) {
  try {
    const { id } = await params;
    const url = new URL(req.url);
    const queryString = url.searchParams.toString();

    const res = await fetch(`${API_URL}/companies/by-page/${id}?${queryString}`, {
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

    // console.log(data);

    // console.log(data[1].serviceCategories);
    // console.log(data.data[0].serviceCategories);

    const parsed = ResponseCompaniesNotAliasSchema.parse(data);

    // console.log(parsed);

    return NextResponse.json(parsed);
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Неизвестная ошибка' }, { status: 500 });
  }
}
