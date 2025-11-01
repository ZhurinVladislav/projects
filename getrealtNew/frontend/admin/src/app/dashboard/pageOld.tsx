'use client';

import { useEffect, useState } from 'react';

export default function DashboardPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Загружаем что-то из API
    fetch('/api/admin/me')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">Панель администратора</h1>
      <p>Добро пожаловать в админку 👋</p>
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
}
