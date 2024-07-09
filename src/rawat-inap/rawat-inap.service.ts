import { Inject, Injectable, Logger } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { ValidationService } from '../common/validation.sevice';
import { RawatInapRepository } from './rawat-inap.repository';
import { ConfigService } from '@nestjs/config';
import {
  CreateRawatInapRequest,
  RawatInapResponse,
} from '../model/rawat-inap.model';
import { RawatInap, User } from '@prisma/client';
import { RawatInapValidation } from './rawat-inap.validation';
import { UserService } from '../user/user.service';
import { KamarService } from '../kamar/kamar.service';

@Injectable()
export class RawatInapService {
  constructor(
    private validationService: ValidationService,
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
    private rawatInapRepo: RawatInapRepository,
    private configService: ConfigService,
    private userService: UserService,
    private kamarService: KamarService,
  ) {}

  toRawatInapResponse(rawatInap: RawatInap): RawatInapResponse {
    return {
      id: rawatInap.id,
      pasienId: rawatInap.pasienId,
      kamarId: rawatInap.kamarId,
      tanggalMasuk: rawatInap.tanggalMasuk,
      tanggalKeluar: rawatInap.tanggalKeluar,
      createdBy: rawatInap.createdBy,
      updatedBy: rawatInap.updatedBy,
    };
  }

  async createRawatInap(
    user: User,
    req: CreateRawatInapRequest,
  ): Promise<RawatInapResponse> {
    this.logger.debug(`Create new Rawat Inap ${JSON.stringify(req)}`);

    const transformedData = {
      ...req,
      tanggalMasuk: new Date(req.tanggalMasuk),
      tanggalKeluar: new Date(req.tanggalKeluar),
    };

    const createReq: CreateRawatInapRequest = this.validationService.validate(
      RawatInapValidation.CREATE,
      transformedData,
    );

    await this.userService.checkUser(createReq.pasienId);
    await this.kamarService.checkKamar(createReq.kamarId);

    const rawatInap = await this.rawatInapRepo.createRawatInap(user, createReq);
    return this.toRawatInapResponse(rawatInap);
  }
}
