'use client';

import { fetchLogin } from '@/app/api/auth/fetchLogin';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Button from '../ui/Button';

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      // Запрос к API (Laravel или Next API route)
      const res = await fetchLogin({ username, password });

      if (!res?.data.token) {
        throw new Error('Нет токена в ответе сервера');
      }

      // Перенаправляем на главную страницу админки
      router.push('/dashboard');
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'Ошибка входа. Проверьте email и пароль.');
    }
  };

  return (
    <form onSubmit={handleLogin} className="flex flex-col gap-4.5">
      <div className="flex flex-col gap-2.5">
        <label htmlFor="login" className="cursor-pointer text-base">
          Имя пользователя
        </label>
        <input
          id="login"
          className="w-full rounded border border-(--secondary-color) bg-(--bg-op-1-color) p-2 backdrop-blur-xs"
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-2.5">
        <label htmlFor="password" className="cursor-pointer text-base">
          Пароль
        </label>
        <input
          id="password"
          className="w-full rounded border border-(--secondary-color) bg-(--bg-op-1-color) p-2 backdrop-blur-xs"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </div>

      {error && <p className="mb-3 text-sm text-red-500">{error}</p>}

      <Button className="mt-8 w-full max-w-full" type="submit">
        Войти
      </Button>
    </form>
  );
};

export default LoginForm;
