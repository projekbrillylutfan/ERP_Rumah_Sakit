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
    const jwtSecret = 'ayam';

    if (token) {
      const decoded = jwt.verify(token, jwtSecret) as { username: string };
      const user = await this.prismaService.user.findUnique({
        where: {
          username: decoded.username,
        },
      });

      if (user) {
        req.user = user;
      }
    }

    next();
  }
}
