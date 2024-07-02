import { Controller, Get } from '@nestjs/common';
import { User } from '@prisma/client';
import { Auth } from 'src/common/auth.decorator';
import { Roles } from 'src/role/role.decorator';

@Controller('/api/users')
export class UserController {
  // @Get()
  // @Roles(['PASIEN', 'ADMIN'])
  // cekDulu(@Auth user: User): User {
  //   return `hello ${user.peran} ${user.nama}`;
  // }
}
