import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { UserService } from './user.service';
import {
  UserResponse,
  RegisterUserRequest,
  AuthResponse,
} from '../model/user.model';
import { WebResponse } from '../model/web.model';
import { User } from '@prisma/client';
import { Auth } from '../common/auth.decorator';
import { Roles } from '../role/role.decorator';

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

  @Post('/login')
  @HttpCode(200)
  async loginUser(
    @Body() req: RegisterUserRequest,
  ): Promise<WebResponse<AuthResponse>> {
    const result = await this.userService.loginPasien(req);
    return {
      data: result,
    };
  }

  @Get('/current')
  @Roles(['PASIEN'])
  @HttpCode(200)
  async get(@Auth() user: User): Promise<WebResponse<UserResponse>> {
    const result = await this.userService.getUser(user);
    return {
      data: result,
    };
  }
}
