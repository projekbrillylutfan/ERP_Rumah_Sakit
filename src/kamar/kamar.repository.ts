import { Injectable } from '@nestjs/common';
import { Kamar, User } from '@prisma/client';
import { PrismaService } from '../common/prisma.service';
import { CreateKamarRequest } from '../model/kamar.model';

@Injectable()
export class KamarRepository {
  constructor(private prisma: PrismaService) {}

  async kamarCreate(user: User, req: CreateKamarRequest): Promise<Kamar> {
    const kamarData = {
      ...req,
      createdBy: user.username,
    };
    return await this.prisma.kamar.create({
      data: kamarData,
    });
  }

  async getKamarAll(): Promise<Kamar[]> {
    return await this.prisma.kamar.findMany();
  }
}
