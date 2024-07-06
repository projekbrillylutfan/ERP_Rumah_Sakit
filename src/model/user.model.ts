export enum Peran {
  ADMIN = 'ADMIN',
  DOKTER = 'DOKTER',
  PASIEN = 'PASIEN',
  PERAWAT = 'PERAWAT',
}

export enum JenisKelamin {
  LAKI_LAKI = 'LAKI_LAKI',
  PEREMPUAN = 'PEREMPUAN',
}

export class RegisterUserRequest {
  nama: string;
  username: string;
  password: string;
  jenisKelamin?: JenisKelamin;
  nomorTelepon?: string;
  alamatEmail?: string;
  spesialisasi?: string;
  peran?: Peran;
}

export class UserResponse {
  nama: string;
  username: string;
  peran?: string;
}

export class AuthResponse {
  akses_token: string;
}

export class LoginUserRequest {
  username: string;
  password: string;
}

export class UpdateUserRequest {
  id: number;
  username: string;
  password: string;
  peran?: Peran;
}
