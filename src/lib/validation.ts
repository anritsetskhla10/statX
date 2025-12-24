import * as z from 'zod';

export const loginSchema = z.object({
  email: z.string().email("არასწორი ელ-ფოსტის ფორმატი"),
  password: z.string().min(6, "პაროლი უნდა იყოს მინ. 6 სიმბოლო"),
});

export const registerSchema = z.object({
  username: z.string().min(2, "სახელი უნდა იყოს მინ. 2 სიმბოლო"),
  email: z.string().email("არასწორი ელ-ფოსტის ფორმატი"),
  password: z.string().min(6, "პაროლი უნდა იყოს მინ. 6 სიმბოლო"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
export type RegisterFormValues = z.infer<typeof registerSchema>;

export const profileSchema = z.object({
  fullName: z.string().min(2, "სახელი უნდა იყოს მინ. 2 სიმბოლო"),
  email: z.string().email().optional(),
  bio: z.string().optional(),
});

export const passwordSchema = z.object({
  password: z.string().min(6, "ახალი პაროლი უნდა იყოს მინ. 6 სიმბოლო"),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;
export type PasswordFormValues = z.infer<typeof passwordSchema>;