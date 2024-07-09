import { Inject, Injectable, Logger } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { ValidationService } from 'src/common/validation.sevice';
import { RawatInapRepository } from './rawat-inap.repository';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RawatInapService {
  constructor(
    private validationService: ValidationService,
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
    private rawatInapRepo: RawatInapRepository,
    private configService: ConfigService,
  ) {}
}
