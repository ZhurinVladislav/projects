import { NextRequest, NextResponse } from 'next/server';
import { API_URL, FRONTEND_TOKEN } from '../config';

export async function POST(req: NextRequest) {
  try {
    const visitId = req.cookies.get('_visit_id')?.value || 'unknown';
    const ip = req.headers.get('x-visitor-ip') || '0.0.0.0';
    const userAgent = req.headers.get('x-visitor-ua') || 'Unknown';

    // Отправляем в Laravel backend
    const res = await fetch(`${API_URL}/visits`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-Frontend-Token': FRONTEND_TOKEN,
      },
      body: JSON.stringify({ ip, user_agent: userAgent }),
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json({ error: data.message || 'Ошибка записи визита' }, { status: res.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Неизвестная ошибка';
    console.error('Ошибка отправки визита:', error);
    return NextResponse.json({ error: msg }, { status: 400 });
  }
}
