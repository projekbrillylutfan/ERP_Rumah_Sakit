import { HttpException, Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { ValidationService } from 'src/common/validation.sevice';
import { RegisterUserRequest, UserResponse } from 'src/model/user.model';
import { Logger } from 'winston';
import { UserValidation } from './user.validation';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    private validationService: ValidationService,
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
    private userRepo: UserRepository,
  ) {}

  async registerPasien(req: RegisterUserRequest): Promise<UserResponse> {
    const registerReq: RegisterUserRequest = this.validationService.validate(
      UserValidation.REGISTER_PASIEN,
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
}
