import {
  Body,
  Controller,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { RawatInapRepository } from './rawat-inap.repository';
import { Roles } from '../role/role.decorator';
import { WebResponse } from '../model/web.model';
import {
  CreateRawatInapRequest,
  RawatInapResponse,
} from '../model/rawat-inap.model';
import { User } from '@prisma/client';
import { Auth } from '../common/auth.decorator';

// role perawat atau admin
@Controller('/api/rawat-inap')
export class RawatInapController {
  constructor(private rawatInapRepo: RawatInapRepository) {}

  @Post('/user/:pasienId/kamar/:kamarId')
  @Roles(['PERAWAT', 'ADMIN'])
  @HttpCode(200)
  async createRawatInap(
    @Auth() user: User,
    @Param('pasienId', ParseIntPipe) pasienId: number,
    @Param('kamarId', ParseIntPipe) kamarId: number,
    @Body() req: CreateRawatInapRequest,
  ): Promise<WebResponse<RawatInapResponse>> {
    const getKamarReq = {
      ...req,
      pasienId: pasienId,
      kamarId: kamarId,
    };

    const result = await this.rawatInapRepo.createRawatInap(user, getKamarReq);
    return {
      data: result,
    };
  }
}
