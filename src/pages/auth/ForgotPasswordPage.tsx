import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { ROUTES } from '@/constants/routes';

import {
  forgotPasswordSchema,
  type ForgotPasswordFormValues,
} from '@/schemas/authSchema';

export const ForgotPasswordPage = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = (data: ForgotPasswordFormValues) => {
    console.log(data);
    // Xử lý gửi OTP ở đây
    navigate(ROUTES.AUTH.OTP);
  };

  return (
    <>
      <div className='flex flex-col space-y-2 text-left mb-6'>
        <h1 className='text-4xl font-semibold tracking-tight'>
          Forgot Password
        </h1>
        <p className='text-base text-muted-foreground'>
          Enter your email address and we will send you an OTP to reset your
          password.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col gap-6'
      >
        <div className='flex flex-col gap-2'>
          <label className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
            Email address
          </label>
          <Input
            type='email'
            placeholder='name@example.com'
            className='h-12'
            {...register('email')}
          />
          {errors.email && (
            <p className='text-destructive text-sm mt-1'>
              {errors.email.message}
            </p>
          )}
        </div>

        <Button
          type='submit'
          disabled={isLoading}
          className='w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground flex justify-between items-center px-4 rounded-md uppercase text-sm font-bold tracking-wider transition-colors'
        >
          <span>Send OTP</span>
          <ArrowRight className='h-4 w-4' />
        </Button>

        <div className='pt-2 text-center'>
          <Link
            to={ROUTES.AUTH.SIGN_IN}
            className='inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors'
          >
            <ArrowLeft className='mr-2 h-4 w-4' />
            Back to Sign In
          </Link>
        </div>
      </form>
    </>
  );
};
