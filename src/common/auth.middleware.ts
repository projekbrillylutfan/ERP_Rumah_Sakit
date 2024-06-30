import { Injectable, NestMiddleware } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private prismaService: PrismaService,
    private configService: ConfigService,
  ) {}

  async use(req: any, res: any, next: (error?: any) => void) {
    const token = req.headers['authorization'] as string;

    if (token) {
      const decoded = jwt.verify(
        token,
        this.configService.get<string>('JWT_SECRET'),
      );
      const user = await this.prismaService.user.findUnique({
        where: {
          id: decoded.sub,
        },
      });

      if (user) {
        req.user = user;
      }
    }

    next();
  }
}
