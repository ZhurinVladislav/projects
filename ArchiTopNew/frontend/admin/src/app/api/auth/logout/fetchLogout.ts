export async function fetchLogout(): Promise<void> {
  const res = await fetch('/api/auth/logout', {
    method: 'GET',
    credentials: 'include',
  });

  if (!res.ok) {
    throw new Error(`Ошибка выхода (${res.status})`);
  }

  return;
}
