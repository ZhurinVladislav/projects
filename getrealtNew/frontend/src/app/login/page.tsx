'use client'; // Это клиентский компонент, так как используем формы и хуки

// import { Button } from '@/components/ui/button'; // Предполагается, что используешь shadcn/ui
// import { Input } from '@/components/ui/input';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { useRouter } from 'next/navigation';
// import { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { toast } from 'react-hot-toast';
// import { z } from 'zod';

// // Схема валидации
// const loginSchema = z.object({
//   email: z.string().email('Invalid email'),
//   password: z.string().min(1, 'Password is required'),
// });

// type LoginForm = z.infer<typeof loginSchema>;

// export default function LoginPage() {
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<LoginForm>({
//     resolver: zodResolver(loginSchema),
//   });

//   const onSubmit = async (data: LoginForm) => {
//     setLoading(true);
//     try {
//       const response = await fetch('https://your-api/api/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(data),
//       });

//       if (!response.ok) {
//         throw new Error('Invalid credentials');
//       }

//       const { token, user } = await response.json();
//       localStorage.setItem('token', token); // Сохраняем токен
//       localStorage.setItem('user', JSON.stringify(user)); // Сохраняем данные пользователя

//       toast.success('Logged in successfully!');
//       router.push('/admin'); // Перенаправляем в админку
//     } catch (error) {
//       toast.error(error.message || 'Login failed');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex min-h-screen items-center justify-center bg-gray-100">
//       <div className="w-full max-w-md rounded bg-white p-8 shadow-md">
//         <h1 className="mb-6 text-2xl font-bold">Login</h1>
//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//           <div>
//             <Input type="email" placeholder="Email" {...register('email')} className={errors.email ? 'border-red-500' : ''} />
//             {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
//           </div>
//           <div>
//             <Input type="password" placeholder="Password" {...register('password')} className={errors.password ? 'border-red-500' : ''} />
//             {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
//           </div>
//           <Button type="submit" disabled={loading} className="w-full">
//             {loading ? 'Logging in...' : 'Login'}
//           </Button>
//         </form>
//       </div>
//     </div>
//   );
// }
