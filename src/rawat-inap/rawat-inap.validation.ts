import { z, ZodType } from 'zod';

export class RawatInapValidation {
  static readonly CREATE: ZodType = z.object({
    pasienId: z.number().positive(),
    kamarId: z.number().positive(),
    tanggalMasuk: z.date(),
    tanggalKeluar: z.date().optional(),
  });
}
