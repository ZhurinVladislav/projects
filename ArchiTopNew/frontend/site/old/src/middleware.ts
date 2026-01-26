import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

const CITIES = ['moscow'];

async function isCity(segment: string): Promise<boolean> {
  return CITIES.includes(segment.toLowerCase());
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  // ✅ Пропускаем системные и статические пути
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/static') ||
    pathname.startsWith('/public') ||
    pathname.startsWith('/img') ||
    pathname.startsWith('/uploads') ||
    pathname.startsWith('/storage') ||
    pathname.startsWith('/fonts') ||
    pathname.startsWith('/.well-known') ||
    pathname.startsWith('/favicon') ||
    pathname.match(/\.(svg|png|jpg|jpeg|webp|gif|ico|json|xml|txt|map)$/)
  ) {
    return NextResponse.next();
  }

  // -----------------------------
  // ✅ Собираем уникальные данные
  // -----------------------------

  // IP пользователя (из заголовков)
  const ip = request.headers.get('cf-connecting-ip') || request.headers.get('x-real-ip') || request.headers.get('x-forwarded-for')?.split(',')[0].trim() || '0.0.0.0';

  // User-Agent
  const userAgent = request.headers.get('user-agent') || 'Unknown';

  // Куки для уникального visitor ID
  const cookies = request.cookies;
  let visitId = cookies.get('_visit_id')?.value;
  const response = NextResponse.next();

  if (!visitId) {
    visitId = uuidv4();
    response.cookies.set('_visit_id', visitId, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365, // 1 год
    });
  }

  // ✅ Доступные данные, которые можно использовать в Route Handlers или API
  response.headers.set('x-visitor-ip', ip);
  response.headers.set('x-visitor-ua', userAgent);
  response.headers.set('x-visitor-id', visitId);

  // -----------------------------
  // ✅ Обработка маршрутов
  // -----------------------------
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length === 0) return NextResponse.next();

  const firstSegment = segments[0];
  const isCitySegment = await isCity(firstSegment);

  // ✅ Если просто /moscow → редиректим на /moscow/services
  if (isCitySegment && segments.length === 1) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = `/${firstSegment}/services`;
    return NextResponse.redirect(redirectUrl);
  }

  // ✅ Если это страница города
  if (isCitySegment) {
    return NextResponse.next();
  }

  // ✅ Остальные страницы — переписываем на /pages/[alias]
  const alias = segments.join('/');
  const rewriteUrl = request.nextUrl.clone();
  rewriteUrl.pathname = `/pages/${alias}`;
  return NextResponse.rewrite(rewriteUrl);
}

// ✅ Matcher без сложных regex-групп (совместимый с Next.js)
export const config = {
  matcher: [
    '/((?!_next).*)',
    '/((?!api).*)',
    '/((?!static).*)',
    '/((?!public).*)',
    '/((?!img).*)',
    '/((?!uploads).*)',
    '/((?!storage).*)',
    '/((?!fonts).*)',
    '/((?!\\.well-known).*)',
    '/((?!favicon\\.ico).*)',
    '/((?!favicon\\.svg).*)',
  ],
};
