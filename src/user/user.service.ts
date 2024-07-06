import { HttpException, Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { ValidationService } from '../common/validation.sevice';
import {
  AuthResponse,
  LoginUserRequest,
  RegisterUserRequest,
  UpdateUserRequest,
  UserResponse,
} from '../model/user.model';
import { Logger } from 'winston';
import { UserValidation } from './user.validation';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';
import { User } from '@prisma/client';

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

  async registerDokter(req: RegisterUserRequest): Promise<UserResponse> {
    this.logger.debug(`Register new Dokter user ${JSON.stringify(req)}`);
    const dokterReq: RegisterUserRequest = this.validationService.validate(
      UserValidation.REGISTER,
      req,
    );

    const shameDokter = await this.userRepo.totalShameUser(dokterReq.username);
    if (shameDokter != 0) {
      throw new HttpException('Dokter already taken', 400);
    }

    dokterReq.password = await bcrypt.hash(dokterReq.password, 10);

    const dokter = await this.userRepo.addDokter(dokterReq);
    return {
      nama: dokter.nama,
      username: dokter.username,
      peran: dokter.peran,
    };
  }

  async loginPasien(req: LoginUserRequest): Promise<AuthResponse> {
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

    const jwtSecret = this.configService.get('JWT_SECRET');
    const jwtExpire = '24h';

    const token = jwt.sign(
      {
        username: checkPasien.username,
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

  async getUser(user: User): Promise<UserResponse> {
    return {
      nama: user.nama,
      username: user.username,
    };
  }

  async updateUser(user: User, req: UpdateUserRequest): Promise<UserResponse> {
    this.logger.debug(`Update user ${JSON.stringify(req)}`);

    const updateReq: UpdateUserRequest = this.validationService.validate(
      UserValidation.UPDATE,
      req,
    );

    updateReq.password = await bcrypt.hash(updateReq.password, 10);

    const result = await this.userRepo.updateUser(user, updateReq);

    return {
      nama: result.nama,
      username: result.username,
    };
  }
}
