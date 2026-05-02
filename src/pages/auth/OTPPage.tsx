import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ArrowRight, RefreshCw } from 'lucide-react';

import { otpSchema, type OTPFormValues } from '@/schemas/authSchema';

export const OTPPage = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm<OTPFormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: '',
    },
  });

  const onSubmit = (data: OTPFormValues) => {
    console.log('OTP submitted', data.otp);
    // Gọi API kiểm tra OTP ở đây
    navigate('/');
  };

  return (
    <>
      <div className='flex flex-col space-y-2 text-left mb-6'>
        <h1 className='text-2xl font-semibold tracking-tight'>
          Two-factor Authentication
        </h1>
        <p className='text-sm text-zinc-500'>
          Please enter the authentication code sent to your email address.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className='space-y-4'
      >
        <div>
          <Input
            type='text'
            placeholder='000000'
            maxLength={6}
            className={`h-12 text-center text-2xl tracking-[0.5em] font-bold ${errors.otp ? 'border-red-500' : 'border-zinc-300'}`}
            {...register('otp')}
          />
          {errors.otp && (
            <p className='text-red-500 text-xs mt-1 text-center'>
              {errors.otp.message}
            </p>
          )}
        </div>

        <Button
          type='submit'
          disabled={isLoading}
          className='w-full h-12 bg-zinc-900 hover:bg-zinc-800 text-white flex justify-between items-center px-4 rounded-md uppercase text-xs font-bold tracking-wider'
        >
          <span>Verify & Login</span>
          <ArrowRight className='h-4 w-4' />
        </Button>

        <div className='pt-4 text-center'>
          <p className='text-sm text-zinc-500 mb-2'>Didn't receive the code?</p>
          <button
            type='button'
            className='inline-flex items-center text-sm font-medium text-zinc-900 hover:underline'
          >
            <RefreshCw className='mr-2 h-4 w-4' />
            Resend Code
          </button>
        </div>
      </form>
    </>
  );
};
