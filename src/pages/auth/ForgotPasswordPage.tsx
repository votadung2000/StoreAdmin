import * as React from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { ROUTES } from '@/constants/routes';

import {
  createForgotPasswordSchema,
  type ForgotPasswordFormValues,
} from '@/schemas/authSchema';
import { useTranslation } from 'react-i18next';

export const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const forgotPasswordSchema = React.useMemo(
    () => createForgotPasswordSchema(t),
    [t],
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = () => {
    navigate({ to: ROUTES.AUTH.OTP });
  };

  return (
    <>
      <div className='flex flex-col space-y-2 text-left mb-6'>
        <h1 className='text-4xl font-semibold tracking-tight'>
          {t('auth.forgotPassword.title')}
        </h1>
        <p className='text-base text-muted-foreground'>
          {t('auth.forgotPassword.description')}
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col gap-6'
      >
        <div className='flex flex-col gap-2'>
          <label className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
            {t('field.emailAddress')}
          </label>
          <Input
            type='email'
            placeholder={t('auth.emailPlaceholder')}
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
          disabled={isSubmitting}
          className='w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground flex justify-between items-center px-4 rounded-md uppercase text-sm font-bold tracking-wider transition-colors'
        >
          <span>{t('actions.sendOtp')}</span>
          <ArrowRight className='h-4 w-4' />
        </Button>

        <div className='pt-2 text-center'>
          <Link
            to={ROUTES.AUTH.SIGN_IN}
            className='inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors'
          >
            <ArrowLeft className='mr-2 h-4 w-4' />
            {t('actions.backToSignIn')}
          </Link>
        </div>
      </form>
    </>
  );
};
