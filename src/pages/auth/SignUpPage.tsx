import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  signUpSchema,
  type SignUpFormValues,
} from '@/schemas/authSchema';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { SocialAuth } from '@/components/auth/SocialAuth';
import { ROUTES } from '@/constants/routes';

export const SignUpPage = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = (data: SignUpFormValues) => {
    console.log(data);
    // Xử lý đăng ký ở đây
    navigate(ROUTES.DASHBOARD.ROOT);
  };

  return (
    <>
      <div className='flex flex-col space-y-2 text-left mb-6'>
        <h1 className='text-4xl font-semibold tracking-tight'>Sign up</h1>
        <p className='text-base text-muted-foreground'>
          Enter your email and password below to create your account. <br />
          Already have an account?{' '}
          <Link
            to={ROUTES.AUTH.SIGN_IN}
            className='text-muted-foreground underline underline-offset-4 hover:text-primary transition-colors'
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
            className={`h-12 ${errors.email ? 'border-destructive' : 'border-input'}`}
            {...register('email')}
          />
          {errors.email && (
            <p className='text-destructive text-xs mt-1'>
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <Input
            type='password'
            placeholder='Password'
            className={`h-12 ${errors.password ? 'border-destructive' : 'border-input'}`}
            {...register('password')}
          />
          {errors.password && (
            <p className='text-destructive text-xs mt-1'>
              {errors.password.message}
            </p>
          )}
        </div>

        <div>
          <Input
            type='password'
            placeholder='Confirm Password'
            className={`h-12 ${errors.confirmPassword ? 'border-destructive' : 'border-input'}`}
            {...register('confirmPassword')}
          />
          {errors.confirmPassword && (
            <p className='text-destructive text-xs mt-1'>
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <Button
          type='submit'
          disabled={isLoading}
          className='w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground flex justify-between items-center px-4 rounded-md uppercase text-sm font-bold tracking-wider transition-colors'
        >
          <span>Sign Up</span>
          <ArrowRight className='h-4 w-4' />
        </Button>

        <SocialAuth />

        <div className='pt-2'>
          <p className='text-sm text-muted-foreground leading-relaxed'>
            By clicking Sign Up, you agree to our website{' '}
            <a
              href='#'
              className='underline underline-offset-4 hover:text-primary transition-colors'
            >
              Terms of Service
            </a>{' '}
            and{' '}
            <a
              href='#'
              className='underline underline-offset-4 hover:text-primary transition-colors'
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
