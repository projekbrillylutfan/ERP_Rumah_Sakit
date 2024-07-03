import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResponse, RegisterUserRequest } from '../model/user.model';
import { WebResponse } from '../model/web.model';

@Controller('/api/users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/pasien')
  @HttpCode(200)
  async registerUser(
    @Body() req: RegisterUserRequest,
  ): Promise<WebResponse<UserResponse>> {
    const result = await this.userService.registerPasien(req);
    return {
      data: result,
    };
  }
}
