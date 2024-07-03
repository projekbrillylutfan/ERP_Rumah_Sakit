import { HttpException, Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { ValidationService } from '../common/validation.sevice';
import {
  Auth,
  LoginUserRequest,
  RegisterUserRequest,
  UserResponse,
} from '../model/user.model';
import { Logger } from 'winston';
import { UserValidation } from './user.validation';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import jwt from 'jsonwebtoken';

@Injectable()
export class UserService {
  constructor(
    private validationService: ValidationService,
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
    private userRepo: UserRepository,
    private configService: ConfigService,
  ) {}

  async registerPasien(req: RegisterUserRequest): Promise<UserResponse> {
    this.logger.debug(`Register new Pasien user ${JSON.stringify(req)}`);
    const registerReq: RegisterUserRequest = this.validationService.validate(
      UserValidation.REGISTER,
      req,
    );
    const shameuser = await this.userRepo.totalShameUser(registerReq.username);

    if (shameuser != 0) {
      throw new HttpException('Username already taken', 400);
    }

    registerReq.password = await bcrypt.hash(registerReq.password, 10);

    const user = await this.userRepo.addPasien(registerReq);
    return {
      nama: user.nama,
      username: user.username,
    };
  }

  async loginPasien(req: LoginUserRequest): Promise<Auth> {
    this.logger.debug(`Login Pasien user ${JSON.stringify(req)}`);
    const loginPasienReq: LoginUserRequest = this.validationService.validate(
      UserValidation.LOGIN,
      req,
    );

    const checkPasien = await this.userRepo.checkPasien(
      loginPasienReq.username,
    );
    if (!checkPasien) {
      throw new HttpException('Username not found', 404);
    }

    const ispPassValid = await bcrypt.compare(
      loginPasienReq.password,
      checkPasien.password,
    );

    if (!ispPassValid) {
      throw new HttpException('Password not valid', 400);
    }

    const jwtSecret = this.configService.get<string>('JWT_SECRET');
    const jwtExpire = '24h';

    const token = jwt.sign(
      {
        sub: checkPasien.username,
      },
      jwtSecret,
      {
        expiresIn: jwtExpire,
      },
    );

    return {
      akses_token: token,
    };
  }
}
