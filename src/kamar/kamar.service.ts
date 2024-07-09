import { HttpException, Inject, Injectable } from '@nestjs/common';
import { ValidationService } from '../common/validation.sevice';
import { Logger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { KamarRepository } from './kamar.repository';
import {
  CreateKamarRequest,
  GetKamarById,
  KamarResponse,
  UpdateKamarRequest,
} from 'src/model/kamar.model';
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
      id: kamar.id,
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

    return this.toKamarResponse(kamar);
  }

  async getKamar(): Promise<KamarResponse[]> {
    const kamarAll = await this.kamarRepo.getKamarAll();
    return kamarAll.map((kamar) => this.toKamarResponse(kamar));
  }

  async checkKamar(id: number): Promise<Kamar> {
    const kamar = await this.kamarRepo.checkKamar(id);
    if (!kamar) {
      throw new HttpException('Kamar not found', 404);
    }

    return kamar;
  }

  async getKamarById(req: GetKamarById): Promise<KamarResponse> {
    const getKamar: GetKamarById = this.validationService.validate(
      KamarValidation.GETID,
      req,
    );

    const kamar = await this.checkKamar(getKamar.id);

    return this.toKamarResponse(kamar);
  }

  async updateKamar(
    user: User,
    req: UpdateKamarRequest,
  ): Promise<KamarResponse> {
    this.logger.debug(`Update Kamar ${JSON.stringify(req)}`);

    const updateReq: UpdateKamarRequest = this.validationService.validate(
      KamarValidation.UPDATE,
      req,
    );

    await this.checkKamar(updateReq.id);

    const kamar = await this.kamarRepo.updateKamar(user, updateReq);
    return this.toKamarResponse(kamar);
  }
}
