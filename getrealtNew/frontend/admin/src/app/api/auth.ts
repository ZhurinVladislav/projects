import { API_URL } from './config';

export const apiLogin = async ({ email, password }: { email: string; password: string }) => {
  const res = await fetch(`${API_URL}/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) throw new Error('Ошибка входа');

  const data = await res.json();
  return data.token; // Laravel возвращает токен
};
