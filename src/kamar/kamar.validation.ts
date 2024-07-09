import { ZodType, z } from 'zod';

export class KamarValidation {
  static readonly CREATE: ZodType = z.object({
    jenisKamar: z.string().min(1).max(100),
    tarifPerHari: z.number().positive(),
  });

  static readonly GETID: ZodType = z.object({
    id: z.number().positive(),
  });
}
