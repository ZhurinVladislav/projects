'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center text-center">
      <h1 className="mb-4 text-5xl font-bold">Страница не найдена 😢</h1>
      <Link href="/" className="text-blue-600 underline">
        Вернуться на главную
      </Link>
    </div>
  );
}
