import { z } from 'zod';

type Translate = (key: string, params?: Record<string, string | number>) => string;

// Sign In Schema
export const createSignInSchema = (t: Translate) =>
  z.object({
    email: z.email(t('validation.emailInvalid')),
    password: z.string().min(6, t('validation.passwordMin')),
  });

export type SignInFormValues = z.infer<ReturnType<typeof createSignInSchema>>;

// Sign Up Schema
export const createSignUpSchema = (t: Translate) =>
  z
    .object({
      email: z.email(t('validation.emailInvalid')),
      password: z.string().min(6, t('validation.passwordMin')),
      confirmPassword: z.string().min(1, t('validation.confirmPasswordRequired')),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t('validation.passwordsDoNotMatch'),
      path: ['confirmPassword'],
    });

export type SignUpFormValues = z.infer<ReturnType<typeof createSignUpSchema>>;

// Forgot Password Schema
export const createForgotPasswordSchema = (t: Translate) =>
  z.object({
    email: z.email(t('validation.emailInvalid')),
  });

export type ForgotPasswordFormValues = z.infer<
  ReturnType<typeof createForgotPasswordSchema>
>;

// OTP Schema
export const createOtpSchema = (t: Translate) =>
  z.object({
    otp: z
      .string()
      .min(6, t('validation.otpLength'))
      .max(6, t('validation.otpLength')),
  })
;

export type OTPFormValues = z.infer<ReturnType<typeof createOtpSchema>>;
