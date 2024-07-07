import { Body, Controller, HttpCode, Post } from '@nestjs/common';
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
    @Body() req: CreateKamarRequest,
    @Auth() user: User,
  ): Promise<WebResponse<KamarResponse>> {
    const result = await this.kamarService.createKamar(req);

    return {
      data: result,
    };
  }
}
