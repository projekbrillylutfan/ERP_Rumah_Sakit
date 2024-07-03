import { Injectable } from '@nestjs/common';
import { Peran, User } from '@prisma/client';
import { PrismaService } from 'src/common/prisma.service';
import { RegisterUserRequest } from 'src/model/user.model';

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  async totalShameUser(username: string): Promise<number> {
    return await this.prisma.user.count({
      where: {
        username: username,
      },
    });
  }

  async addPasien(req: RegisterUserRequest): Promise<User> {
    const userData = {
      ...req,
      peran: Peran.PASIEN, // atau nilai default yang sesuai
    };
    return await this.prisma.user.create({
      data: userData,
    });
  }

  async checkPasien(username: string): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: {
        username: username,
      },
    });
  }
}
