import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { UserModule } from './user/user.module';
import { APP_GUARD } from '@nestjs/core';
import { RoleGuard } from './role/role.guard';
import { KamarModule } from './kamar/kamar.module';

@Module({
  imports: [CommonModule, UserModule, KamarModule],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
  ],
})
export class AppModule {}
