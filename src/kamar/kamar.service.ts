import { Inject, Injectable } from '@nestjs/common';
import { ValidationService } from '../common/validation.sevice';
import { Logger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { KamarRepository } from './kamar.repository';
import { CreateKamarRequest, KamarResponse } from 'src/model/kamar.model';
import { KamarValidation } from './kamar.validation';
import { Kamar, User } from '@prisma/client';

@Injectable()
export class KamarService {
  constructor(
    private validationService: ValidationService,
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
    private kamarRepo: KamarRepository,
  ) {}

  toKamarResponse(kamar: Kamar): KamarResponse {
    return {
      jenisKamar: kamar.jenisKamar,
      tarifPerHari: kamar.tarifPerHari.toNumber(),
      createdBy: kamar.createdBy,
      updatedBy: kamar.updatedBy,
    };
  }

  async createKamar(
    user: User,
    req: CreateKamarRequest,
  ): Promise<KamarResponse> {
    this.logger.debug(`Create new Kamar ${JSON.stringify(req)}`);

    const kamarReq: CreateKamarRequest = this.validationService.validate(
      KamarValidation.CREATE,
      req,
    );

    const kamar = await this.kamarRepo.kamarCreate(user, kamarReq);

    return {
      jenisKamar: kamar.jenisKamar,
      tarifPerHari: kamar.tarifPerHari.toNumber(),
      createdBy: kamar.createdBy,
    };
  }

  async getKamar(): Promise<KamarResponse[]> {
    const kamarAll = await this.kamarRepo.getKamarAll();
    return kamarAll.map((kamar) => this.toKamarResponse(kamar));
  }
}
