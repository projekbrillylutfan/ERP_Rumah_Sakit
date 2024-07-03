export enum Peran {
  ADMIN = 'ADMIN',
  DOKTER = 'DOKTER',
  PASIEN = 'PASIEN',
  PERAWAT = 'PERAWAT',
}

export class RegisterUserRequest {
  nama: string;
  username: string;
  password: string;
  peran?: Peran;
}

export class UserResponse {
  nama: string;
  username: string;
}

export class Auth {
  akses_token: string;
}

export class LoginUserRequest {
  username: string;
  password: string;
}
