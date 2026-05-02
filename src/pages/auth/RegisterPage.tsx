import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const registerSchema = z
  .object({
    email: z.string().email('Email is invalid'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

export const SignUpPage = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = (data: RegisterFormValues) => {
    console.log('register data', data);
    // Gọi API đăng ký ở đây
    navigate('/login');
  };

  return (
    <>
      <div className='flex flex-col space-y-2 text-left mb-6'>
        <h1 className='text-2xl font-semibold tracking-tight'>
          Create an account
        </h1>
        <p className='text-sm text-zinc-500'>
          Enter your email and password below to create your account. <br />
          Already have an account?{' '}
          <Link
            to='/login'
            className='underline underline-offset-4 hover:text-zinc-900 font-medium'
          >
            Sign In
          </Link>
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className='space-y-4'
      >
        <div>
          <Input
            type='email'
            placeholder='Email'
            className={`h-12 ${errors.email ? 'border-red-500' : 'border-zinc-300'}`}
            {...register('email')}
          />
          {errors.email && (
            <p className='text-red-500 text-xs mt-1'>{errors.email.message}</p>
          )}
        </div>

        <div>
          <Input
            type='password'
            placeholder='Password'
            className={`h-12 ${errors.password ? 'border-red-500' : 'border-zinc-300'}`}
            {...register('password')}
          />
          {errors.password && (
            <p className='text-red-500 text-xs mt-1'>
              {errors.password.message}
            </p>
          )}
        </div>

        <div>
          <Input
            type='password'
            placeholder='Confirm Password'
            className={`h-12 ${errors.confirmPassword ? 'border-red-500' : 'border-zinc-300'}`}
            {...register('confirmPassword')}
          />
          {errors.confirmPassword && (
            <p className='text-red-500 text-xs mt-1'>
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <Button
          type='submit'
          disabled={isLoading}
          className='w-full h-12 bg-zinc-900 hover:bg-zinc-800 text-white flex justify-between items-center px-4 rounded-md uppercase text-xs font-bold tracking-wider'
        >
          <span>Create Account</span>
          <ArrowRight className='h-4 w-4' />
        </Button>

        <div className='relative my-4'>
          <div className='absolute inset-0 flex items-center'>
            <span className='w-full border-t border-zinc-200' />
          </div>
          <div className='relative flex justify-center text-xs uppercase'>
            <span className='bg-white px-2 text-zinc-500'>
              Or continue with
            </span>
          </div>
        </div>

        <div className='grid grid-cols-3 gap-4 pt-2'>
          <Button
            variant='outline'
            type='button'
            className='h-12 border-zinc-300 rounded-md hover:bg-zinc-50'
          >
            <svg
              viewBox='0 0 24 24'
              className='h-5 w-5'
            >
              <path
                fill='#4285F4'
                d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
              />
              <path
                fill='#34A853'
                d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
              />
              <path
                fill='#FBBC05'
                d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'
              />
              <path
                fill='#EA4335'
                d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
              />
            </svg>
          </Button>
          <Button
            variant='outline'
            type='button'
            className='h-12 border-zinc-300 rounded-md hover:bg-zinc-50'
          >
            <svg
              viewBox='0 0 24 24'
              className='h-6 w-6'
              fill='currentColor'
            >
              <path d='M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.15 2.95.93 3.78 2.04-3.18 1.83-2.63 6.04.5 7.25-.76 1.76-1.74 3.58-2.93 3.72zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z' />
            </svg>
          </Button>
          <Button
            variant='outline'
            type='button'
            className='h-12 border-zinc-300 rounded-md hover:bg-zinc-50'
          >
            <svg
              viewBox='0 0 24 24'
              className='h-6 w-6'
              fill='#1877F2'
            >
              <path d='M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' />
            </svg>
          </Button>
        </div>

        <div className='pt-6'>
          <p className='text-xs text-zinc-500 leading-relaxed text-justify'>
            By clicking Create Account, you agree to our website{' '}
            <a
              href='#'
              className='underline hover:text-zinc-800'
            >
              Terms of Service
            </a>{' '}
            and{' '}
            <a
              href='#'
              className='underline hover:text-zinc-800'
            >
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </form>
    </>
  );
};
