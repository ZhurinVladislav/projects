'use client';

import Api from '@/app/api';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Button from '../ui/Button';

const LogoutButton: React.FC = () => {
  const router = useRouter();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setLoading(true);
      await Api.fetchLogout();
      router.push('/login');
    } catch (err) {
      console.error('Ошибка при выходе:', err);
      setError('Не удалось выйти. Попробуйте снова.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Button onClick={handleLogout} className="w-full max-w-full" variant="secondary" disabled={loading}>
        {loading ? 'Выходим...' : 'Выйти'}
      </Button>
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default LogoutButton;
