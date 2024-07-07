import { Injectable } from '@nestjs/common';
import { Kamar } from '@prisma/client';
import { PrismaService } from '../common/prisma.service';
import { CreateKamarRequest } from '../model/kamar.model';

@Injectable()
export class KamarRepository {
  constructor(private prisma: PrismaService) {}

  async kamarCreate(req: CreateKamarRequest): Promise<Kamar> {
    return await this.prisma.kamar.create({
      data: req,
    });
  }
}
