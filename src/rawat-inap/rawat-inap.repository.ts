import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { RawatInap, User } from '@prisma/client';
import { CreateRawatInapRequest } from 'src/model/rawat-inap.model';

@Injectable()
export class RawatInapRepository {
  constructor(private prisma: PrismaService) {}

  async createRawatInap(
    user: User,
    req: CreateRawatInapRequest,
  ): Promise<RawatInap> {
    const rawatInapData = {
      ...req,
      createdBy: user.username,
    };
    return await this.prisma.rawatInap.create({
      data: rawatInapData,
    });
  }
}
