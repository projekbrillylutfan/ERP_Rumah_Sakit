import { z, ZodType } from 'zod';

export class UserValidation {
  static readonly REGISTER: ZodType = z.object({
    nama: z.string().min(1).max(100),
    username: z.string().min(1).max(100),
    password: z.string().min(1).max(100),
  });

  static readonly LOGIN: ZodType = z.object({
    username: z.string().min(1).max(100),
    password: z.string().min(1).max(100),
  });

  static readonly UPDATE: ZodType = z.object({
    id: z.number(),
    nama: z.string().min(1).max(100),
    username: z.string().min(1).max(100),
    password: z.string().min(1).max(100),
  });
}
