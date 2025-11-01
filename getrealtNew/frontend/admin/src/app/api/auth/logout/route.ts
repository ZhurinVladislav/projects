import { NextRequest, NextResponse } from 'next/server';
import { API_URL, FRONTEND_TOKEN } from '../../config';

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('admin_token')?.value;

    if (token) {
      await fetch(`${API_URL}/logout`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'X-Frontend-Token': FRONTEND_TOKEN,
        },
      });
    }

    // Очистка cookie
    const res = NextResponse.json({ success: true });
    res.cookies.set('admin_token', '', { maxAge: 0, path: '/' });
    return res;
  } catch (err) {
    console.error('Logout error:', err);
    const res = NextResponse.json({ success: false, error: 'Logout failed' }, { status: 500 });
    res.cookies.set('admin_token', '', { maxAge: 0, path: '/' });
    return res;
  }
}
