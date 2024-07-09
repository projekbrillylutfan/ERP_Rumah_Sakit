import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { KamarService } from './kamar.service';
import { CreateKamarRequest, KamarResponse } from 'src/model/kamar.model';
import { WebResponse } from '../model/web.model';
import { Roles } from '../role/role.decorator';
import { Auth } from '../common/auth.decorator';
import { User } from '@prisma/client';

@Controller('/api/kamar')
export class KamarController {
  constructor(private kamarService: KamarService) {}

  @Post()
  @Roles(['ADMIN'])
  @HttpCode(200)
  async createKamar(
    @Auth() user: User,
    @Body() req: CreateKamarRequest,
  ): Promise<WebResponse<KamarResponse>> {
    const result = await this.kamarService.createKamar(user, req);

    return {
      data: result,
    };
  }

  @Get()
  @Roles(['ADMIN'])
  @HttpCode(200)
  async getKamarAll(): Promise<WebResponse<KamarResponse[]>> {
    const result = await this.kamarService.getKamar();
    return {
      data: result,
    };
  }

  @Get('/:kamarId')
  @Roles(['PASIEN', 'ADMIN', 'DOKTER', 'PERAWAT'])
  @HttpCode(200)
  async getKamarById(
    @Param('kamarId', ParseIntPipe) kamarId: number,
  ): Promise<WebResponse<KamarResponse>> {
    const getKamarReq = {
      id: kamarId,
    };
    const result = await this.kamarService.getKamarById(getKamarReq);

    return {
      data: result,
    };
  }
}
