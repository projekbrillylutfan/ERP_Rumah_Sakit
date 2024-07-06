import { Injectable } from '@nestjs/common';
import { Peran, User } from '@prisma/client';
import { PrismaService } from '../common/prisma.service';
import { RegisterUserRequest, UpdateUserRequest } from '../model/user.model';

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

  async addDokter(req: RegisterUserRequest): Promise<User> {
    const dokterData = {
      ...req,
      peran: Peran.DOKTER, // atau nilai default yang sesuai
    };

    return await this.prisma.user.create({
      data: dokterData,
    });
  }

  async addPerawat(req: RegisterUserRequest): Promise<User> {
    const perawatData = {
      ...req,
      peran: Peran.PERAWAT, // atau nilai default yang sesuai
    };

    return await this.prisma.user.create({
      data: perawatData,
    });
  }

  async checkPasien(username: string): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: {
        username: username,
      },
    });
  }

  async updateUser(user: User, req: UpdateUserRequest): Promise<User> {
    return await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: req,
    });
  }
}
