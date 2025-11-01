'use client';

import Api from '@/app/api';
import { FetchUserSchema, TFetchUser, TUser } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface IProps {
  user: TUser;
}

const ProfileForm: React.FC<IProps> = props => {
  const { user } = props;

  const [serverErrors, setServerErrors] = useState<Record<string, string[]>>({});
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TFetchUser>({
    resolver: zodResolver(FetchUserSchema),
    defaultValues: {
      name: user.name,
      username: user.username,
      email: user.email,
      password: '',
      password_confirmation: '',
    },
  });

  const onSubmit = async (data: TFetchUser) => {
    try {
      setIsLoading(true);
      setServerErrors({});
      const response = await Api.fetchUpdateUser(user.id, data);

      alert(`Профиль обновлён: ${response.name}`);
    } catch (err: any) {
      console.error(err);
      if (err.errors) setServerErrors(err.errors);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="rounded-xlp-6 mx-auto shadow-md">
      <h2 className="mb-4 text-xl font-semibold">Редактирование профиля</h2>

      <div>
        <label>Имя</label>
        <input {...register('name')} className="w-full rounded border p-2" />
        <p className="text-red-500">{errors.name?.message || serverErrors.name?.[0]}</p>
      </div>

      <div>
        <label>Имя пользователя</label>
        <input {...register('username')} className="w-full rounded border p-2" />
        <p className="text-red-500">{errors.username?.message || serverErrors.username?.[0]}</p>
      </div>

      <div>
        <label>Email</label>
        <input {...register('email')} type="email" className="w-full rounded border p-2" />
        <p className="text-red-500">{errors.email?.message || serverErrors.email?.[0]}</p>
      </div>

      <div>
        <label>Новый пароль (опционально)</label>
        <input {...register('password')} type="password" className="w-full rounded border p-2" />
        <p className="text-red-500">{errors.password?.message}</p>
      </div>

      <div>
        <label>Подтверждение пароля</label>
        <input {...register('password_confirmation')} type="password" className="w-full rounded border p-2" />
        <p className="text-red-500">{errors.password_confirmation?.message || serverErrors.password_confirmation?.[0]}</p>
      </div>

      <button disabled={isLoading} className="w-full rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
        {isLoading ? 'Сохранение...' : 'Сохранить изменения'}
      </button>
    </form>
  );
};

export default ProfileForm;
