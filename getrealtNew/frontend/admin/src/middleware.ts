import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('admin_token')?.value;
  const { pathname } = request.nextUrl;

  // Главная админки (корень поддомена)
  if (pathname === '/' || pathname === '') {
    if (token) {
      // 🔐 Авторизован → Dashboard
      return NextResponse.redirect(new URL('/dashboard', request.url));
    } else {
      // 🔒 Не авторизован → Login
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // Защищённые маршруты
  const protectedRoutes = ['/dashboard', '/services', '/users'];
  const isProtected = protectedRoutes.some(route => pathname.startsWith(route));

  // Если защищённая страница, а токена нет → на login
  if (isProtected && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Если пользователь уже авторизован и идёт на /login → в Dashboard
  if (pathname.startsWith('/login') && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Обрабатываем все пути, кроме API, статических файлов и favicon
    '/((?!_next/static|_next/image|favicon.ico|api/|.*\\.(?:png|jpg|jpeg|svg|gif|webp|ico)).*)',
  ],
};
