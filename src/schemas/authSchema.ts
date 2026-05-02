import { z } from 'zod';

// Sign In Schema
export const signInSchema = z.object({
  email: z.email('Email is invalid'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

export type SignInFormValues = z.infer<typeof signInSchema>;

// Sign Up Schema
export const signUpSchema = z
  .object({
    email: z.email('Email is invalid'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export type SignUpFormValues = z.infer<typeof signUpSchema>;

// Forgot Password Schema
export const forgotPasswordSchema = z.object({
  email: z.email('Email is invalid'),
});

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

// OTP Schema
export const otpSchema = z.object({
  otp: z.string().min(6, 'OTP must be 6 digits').max(6),
});

export type OTPFormValues = z.infer<typeof otpSchema>;
