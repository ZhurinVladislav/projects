'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const res = await fetch(`${baseUrl}/api/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    if (res.ok) {
      router.push('/admin/dashboard');
    } else {
      console.log(res);

      setError('Неверный логин или пароль');
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <form onSubmit={handleLogin} className="w-96 rounded-xl bg-white p-6 shadow-md">
        <h1 className="mb-4 text-center text-2xl font-semibold">Вход в админку</h1>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className="mb-3 w-full rounded border p-2" />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Пароль" className="mb-3 w-full rounded border p-2" />
        {error && <p className="mb-3 text-sm text-red-500">{error}</p>}
        <button type="submit" className="w-full rounded bg-blue-600 p-2 text-white hover:bg-blue-700">
          Войти
        </button>
      </form>
    </div>
  );
}
