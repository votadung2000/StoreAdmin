import * as React from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  createSignUpSchema,
  type SignUpFormValues,
} from '@/schemas/authSchema';
import { useAuthStore } from '@/stores/authStore';
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
import { AppPasswordInput } from '@/components/shared/app-password-input';
import { AppSocialAuth } from '@/components/shared/app-social-auth';
import { ROUTES } from '@/constants/routes';
import { useTranslation } from 'react-i18next';

export const SignUpPage = () => {
  const signInWithDemoSession = useAuthStore(
    (state) => state.signInWithDemoSession,
  );
  const navigate = useNavigate();
  const { t } = useTranslation();
  const signUpSchema = React.useMemo(() => createSignUpSchema(t), [t]);

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

  const onSubmit = () => {
    signInWithDemoSession();
    navigate({ to: ROUTES.MAIN.DASHBOARD });
  };

  return (
    <>
      <div className='flex flex-col space-y-2 text-left mb-6'>
        <h1 className='text-4xl font-semibold tracking-tight'>
          {t('auth.signUp.title')}
        </h1>
        <p className='text-base text-muted-foreground'>
          {t('auth.signUp.description')} <br />
          {t('auth.signUp.alreadyHaveAccount')}{' '}
          <Link
            to={ROUTES.AUTH.SIGN_IN}
            className='text-muted-foreground underline underline-offset-4 hover:text-primary transition-colors'
          >
            {t('auth.signIn.title')}
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
                <FormLabel>{t('field.email')}</FormLabel>
                <FormControl>
                  <Input
                    type='email'
                    placeholder={t('auth.emailPlaceholder')}
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
                <FormLabel>{t('field.password')}</FormLabel>
                <FormControl>
                  <AppPasswordInput
                    placeholder={t('auth.passwordPlaceholder')}
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
                <FormLabel>{t('field.confirmPassword')}</FormLabel>
                <FormControl>
                  <AppPasswordInput
                    placeholder={t('auth.passwordPlaceholder')}
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
                <span>{t('actions.signUp')}</span>
                <ArrowRight className='h-4 w-4' />
              </>
            )}
          </Button>

          <AppSocialAuth />

          <div className='pt-2'>
            <p className='text-sm text-muted-foreground leading-relaxed'>
              {t('auth.legal.prefix', { action: t('auth.signUp.title') })}{' '}
              <span className='font-medium text-foreground'>
                {t('auth.legal.terms')}
              </span>{' '}
              {t('auth.legal.and')}{' '}
              <span className='font-medium text-foreground'>
                {t('auth.legal.privacy')}
              </span>
              .
            </p>
          </div>
        </form>
      </Form>
    </>
  );
};
