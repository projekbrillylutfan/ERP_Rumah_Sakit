import { Injectable } from '@nestjs/common';
import { Kamar, User } from '@prisma/client';
import { PrismaService } from '../common/prisma.service';
import { CreateKamarRequest, UpdateKamarRequest } from '../model/kamar.model';

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

  async checkKamar(id: number): Promise<Kamar> {
    return await this.prisma.kamar.findFirst({
      where: {
        id: id,
      },
    });
  }

  async updateKamar(user: User, req: UpdateKamarRequest): Promise<Kamar> {
    const kamarData = {
      ...req,
      updatedBy: user.username,
    };
    return await this.prisma.kamar.update({
      where: {
        id: req.id,
      },
      data: kamarData,
    });
  }
}
