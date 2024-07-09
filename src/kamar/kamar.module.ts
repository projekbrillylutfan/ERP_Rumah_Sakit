import { Module } from '@nestjs/common';
import { KamarController } from './kamar.controller';
import { KamarService } from './kamar.service';
import { KamarRepository } from './kamar.repository';

@Module({
  controllers: [KamarController],
  providers: [KamarService, KamarRepository],
  exports: [KamarService],
})
export class KamarModule {}
