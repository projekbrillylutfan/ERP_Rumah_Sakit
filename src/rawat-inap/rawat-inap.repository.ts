import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';

@Injectable()
export class RawatInapRepository {
  constructor(private prisma: PrismaService) {}
}
