import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const email = process.env.SEED_ADMIN_EMAIL ?? 'ray.nguyen147@gmail.com';
  const plainPassword = process.env.SEED_ADMIN_PASSWORD ?? 'Admin@123';
  const hashedPassword = await bcrypt.hash(plainPassword, 10);

  const admin = await prisma.user.upsert({
    where: { email },
    update: {
      firstName: 'Admin',
      lastName: 'User',
      password: hashedPassword,
      phoneNumber: '0123456789',
      image: 'https://ui-avatars.com/api/?name=Admin+User&background=C0851A&color=fff',
      role: 'admin',
    },
    create: {
      firstName: 'Admin',
      lastName: 'User',
      email,
      password: hashedPassword,
      phoneNumber: '0123456789',
      image: 'https://ui-avatars.com/api/?name=Admin+User&background=C0851A&color=fff',
      role: 'admin',
    },
  });

  console.log(`Seeded admin user: ${admin.email}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
