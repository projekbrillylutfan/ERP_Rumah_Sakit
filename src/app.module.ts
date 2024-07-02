import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { UserModule } from './user/user.module';
import { APP_GUARD } from '@nestjs/core';
import { RoleGuard } from './role/role.guard';

@Module({
  imports: [CommonModule, UserModule],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
  ],
})
export class AppModule {}
