import Api from '@/api';
import { queryClient } from '@/api/queryClient';
import IconEmail from '@/assets/icons/email.svg?react';
import IconKey from '@/assets/icons/key.svg?react';
import useAppContext from '@/hooks/useAppContext';
import { Button } from '@/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { memo } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import FormField from '../../ui/FormField';

export const LoginSchema = z.object({
  email: z.string().min(1, 'Это поле должно быть заполнено.').email('Это неверное электронное письмо.'),
  password: z.string().min(8, 'Длина пароля должна быть не менее 8 символов'),
});

export type LoginForm = z.infer<typeof LoginSchema>;

type AuthType = {
  authType: string;
  handleToggleForm: () => void;
};

type TProps = LoginForm & AuthType;

export const LoginForm: React.FC<TProps> = memo(({ authType, handleToggleForm }): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { isDirty, isSubmitting, errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(LoginSchema),
  });
  const { logIn } = useAppContext();

  const loginMutation = useMutation(
    {
      mutationFn: (data: { email: string; password: string }) => Api.fetchLoginUser(data),
      onSuccess: async () => {
        queryClient.invalidateQueries({ queryKey: ['user', 'me'] });
        const updatedUser = await Api.fetchProfileUser();
        logIn(updatedUser);
      },
      onError: error => {
        console.log(error.message);
      },
    },
    queryClient,
  );

  const onSubmit: SubmitHandler<LoginForm> = data => {
    loginMutation.mutate(data);
  };

  return (
    <>
      <form className="popup__form" onSubmit={handleSubmit(onSubmit)}>
        <ul className="popup__list">
          <li className="popup__list-item">
            <FormField classElement="popup__" errorMessage={errors.email?.message} isValid={errors.email ? false : true}>
              <IconEmail className="form-field__icon input-icon" />
              <input className="form-field__input input" {...register('email')} type="email" name="email" placeholder="Электронная почта" />
            </FormField>
          </li>
          <li className="popup__list-item">
            <FormField classElement="popup__" errorMessage={errors.password?.message} isValid={errors.password ? false : true}>
              <IconKey className="form-field__icon input-icon" />
              <input className="form-field__input input" {...register('password')} type="password" name="password" placeholder="Пароль" />
            </FormField>
          </li>
        </ul>
        {loginMutation.error && (
          <span style={{ color: 'red' }}>{loginMutation.error.message}</span>
          // <span style={{ color: 'red' }}>Неверный логин или пароль</span>
        )}
        <Button classElement="popup__btn" ariaLabel="Войти в аккаунт" type="btn-inv" isDisabled={!isDirty || isSubmitting} isLoading={loginMutation.isPending}>
          Войти
        </Button>
      </form>
      <Button classElement="popup__btn-text" ariaLabel={authType === 'register' ? 'Войти' : 'Регистрация'} onClick={handleToggleForm} type="btn-text-inv">
        {authType === 'register' ? 'У меня есть пароль' : 'Регистрация'}
      </Button>
    </>
  );
});
