import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signUpSchema, type SignUpFormValues } from '@/schemas/authSchema';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ArrowRight, Loader2 } from 'lucide-react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { PasswordInput } from '@/components/PasswordInput';
import { SocialAuth } from '@/components/auth/SocialAuth';
import { ROUTES } from '@/constants/routes';

export const SignUpPage = () => {
  const navigate = useNavigate();

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    mode: 'all',
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = (data: SignUpFormValues) => {
    console.log('data', data);
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

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='flex flex-col gap-6'
        >
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type='email'
                    placeholder='name@example.com'
                    className='h-12'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <PasswordInput
                    placeholder='••••••••'
                    classNameInput='h-12'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='confirmPassword'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <PasswordInput
                    placeholder='••••••••'
                    classNameInput='h-12'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type='submit'
            disabled={isSubmitting || !isValid}
            className='w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground flex justify-between items-center px-4 rounded-md uppercase text-sm font-bold tracking-wider transition-colors'
          >
            {isSubmitting ? (
              <Loader2 className='h-4 w-4 animate-spin mx-auto' />
            ) : (
              <>
                <span>SIGN UP</span>
                <ArrowRight className='h-4 w-4' />
              </>
            )}
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
      </Form>
    </>
  );
};
