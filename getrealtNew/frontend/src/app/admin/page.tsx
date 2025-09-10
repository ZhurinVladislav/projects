// app/admin/page.tsx
import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function AdminDashboard() {
  const session = await getSession(); // Запрос к API для проверки токена

  if (!session || session.role !== 'admin') {
    redirect('/login');
  }

  return <h1>Welcome to Admin Dashboard</h1>;
}
