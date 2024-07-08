import { JenisKelamin, Peran, PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import * as bcrypt from 'bcrypt';

async function main() {
  const hashedPassword = await bcrypt.hash('password123', 10);
  const user = {
    nama: 'John Doe',
    username: 'johndoe',
    password: hashedPassword,
    jenisKelamin: JenisKelamin.LAKI_LAKI,
    nomorTelepon: '081234567890',
    alamatEmail: 'john.doe@example.com',
    spesialisasi: 'Software Engineer',
    peran: Peran.ADMIN,
  };

  await prisma.user.create({
    data: user,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
