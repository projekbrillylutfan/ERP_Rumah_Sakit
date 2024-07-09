import { Module } from '@nestjs/common';
import { RawatInapService } from './rawat-inap.service';
import { RawatInapController } from './rawat-inap.controller';
import { RawatInapRepository } from './rawat-inap.repository';

@Module({
  providers: [RawatInapService],
  controllers: [RawatInapController, RawatInapRepository],
})
export class RawatInapModule {}
