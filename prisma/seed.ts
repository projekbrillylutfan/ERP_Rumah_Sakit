import { PrismaClient, Peran, JenisKelamin } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Seed data for Pasien
  await prisma.user.createMany({
    data: [
      {
        nama: 'Alice',
        alamat: 'Jl. Merdeka 123',
        tanggalLahir: new Date('1980-01-01'),
        jenisKelamin: JenisKelamin.PEREMPUAN,
        nomorTelepon: '08123456789',
        alamatEmail: 'alice@prisma.io',
        spesialisasi: null,
        shift: null,
        peran: Peran.PASIEN,
      },
      {
        nama: 'Bob',
        alamat: 'Jl. Kemerdekaan 45',
        tanggalLahir: new Date('1990-02-02'),
        jenisKelamin: JenisKelamin.LAKI_LAKI,
        nomorTelepon: '08129876543',
        alamatEmail: 'bob@prisma.io',
        spesialisasi: null,
        shift: null,
        peran: Peran.PASIEN,
      },
    ],
  });

  console.log('Seeding for Pasien finished.');

  // Seed data for Dokter
  await prisma.user.createMany({
    data: [
      {
        nama: 'Dr. Charlie',
        alamat: 'Jl. Kesehatan 9',
        tanggalLahir: new Date('1975-03-03'),
        jenisKelamin: JenisKelamin.LAKI_LAKI,
        nomorTelepon: '08121234567',
        alamatEmail: 'charlie@prisma.io',
        spesialisasi: 'Spesialis Jantung',
        shift: 'PAGI', // Sesuaikan dengan enum Shift kamu
        peran: Peran.DOKTER,
      },
      {
        nama: 'Dr. Diana',
        alamat: 'Jl. Sehat Sentosa 10',
        tanggalLahir: new Date('1985-04-04'),
        jenisKelamin: JenisKelamin.PEREMPUAN,
        nomorTelepon: '08129871234',
        alamatEmail: 'diana@prisma.io',
        spesialisasi: 'Spesialis Anak',
        shift: 'SIANG', // Sesuaikan dengan enum Shift kamu
        peran: Peran.DOKTER,
      },
    ],
  });

  console.log('Seeding for Dokter finished.');

  // Seed data for Perawat
  await prisma.user.createMany({
    data: [
      {
        nama: 'Perawat Eva',
        alamat: 'Jl. Perawat Sehat 1',
        tanggalLahir: new Date('1992-05-05'),
        jenisKelamin: JenisKelamin.PEREMPUAN,
        nomorTelepon: '08123487654',
        alamatEmail: 'eva@prisma.io',
        spesialisasi: 'Perawat Umum',
        shift: 'MALAM', // Sesuaikan dengan enum Shift kamu
        peran: Peran.PERAWAT,
      },
      {
        nama: 'Perawat Frank',
        alamat: 'Jl. Perawat Hebat 2',
        tanggalLahir: new Date('1988-06-06'),
        jenisKelamin: JenisKelamin.LAKI_LAKI,
        nomorTelepon: '08128765432',
        alamatEmail: 'frank@prisma.io',
        spesialisasi: 'Perawat ICU',
        shift: 'PAGI', // Sesuaikan dengan enum Shift kamu
        peran: Peran.PERAWAT,
      },
    ],
  });

  console.log('Seeding for Perawat finished.');

  // Seed data for Admin
  await prisma.user.createMany({
    data: [
      {
        nama: 'Admin Grace',
        alamat: 'Jl. Admin Utama 1',
        tanggalLahir: new Date('1985-07-07'),
        jenisKelamin: JenisKelamin.PEREMPUAN,
        nomorTelepon: '08123432123',
        alamatEmail: 'grace@prisma.io',
        spesialisasi: null,
        shift: null,
        peran: Peran.ADMIN,
      },
      {
        nama: 'Admin Henry',
        alamat: 'Jl. Admin Hebat 2',
        tanggalLahir: new Date('1990-08-08'),
        jenisKelamin: JenisKelamin.LAKI_LAKI,
        nomorTelepon: '08129879876',
        alamatEmail: 'henry@prisma.io',
        spesialisasi: null,
        shift: null,
        peran: Peran.ADMIN,
      },
    ],
  });

  console.log('Seeding for Admin finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
