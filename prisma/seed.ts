import { Prisma, PrismaClient } from "@prisma/client";
import { treeTemplates } from "../src/constants/templates";

const prisma = new PrismaClient();

const date = new Date();
const expDate = new Date(new Date().setHours(new Date().getHours() + 2)); // 2 hours

const userData: Prisma.UserCreateInput[] = [
  {
    username: "Mario",
    email: "mario@kart.com",
    verifiedAt: date,
    password: "$2a$10$KwadqibaZsHdutG.1L8UcOqFK9.PGbgO2tRHZX602CkotjVN/llxy", // password
    projects: {
      create: [
        {
          title: "3d graph",
          editor_input: treeTemplates._typescript,
          description: "the beautiful 3d graph",
        },
      ],
    },
    profile: {
      create: {
        avatar:
          "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/d936d8103206343.5f47cc17b689a.png",
      },
    },
  },
  {
    username: "Yoshi",
    email: "yoshi@kart.com",
    verifiedAt: date,
    password: "$2a$10$KwadqibaZsHdutG.1L8UcOqFK9.PGbgO2tRHZX602CkotjVN/llxy", // password
    projects: {
      create: [
        {
          title: "colorful parallax",
          editor_input: treeTemplates._vanilla,
          description: "how to create colorful parallax",
        },
      ],
    },
    profile: {
      create: {
        avatar:
          "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/1cad5e91542967.5e34455529633.jpg",
      },
    },
  },
  {
    username: "Peach",
    email: "peach@kart.com",
    verifiedAt: date,
    password: "$2a$10$KwadqibaZsHdutG.1L8UcOqFK9.PGbgO2tRHZX602CkotjVN/llxy", // password
    projects: {
      create: [
        {
          title: "like-lunchroom",
          editor_input: treeTemplates._react,
          description: "lets build a lunchroom",
        },
      ],
    },
    profile: {
      create: {
        avatar:
          "https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/189092356/original/449fb5c42400a3cec46c10d53c0c28afad2649e1/make-you-a-minecraft-logo.png",
      },
    },
  },
];

const verificationTokenData: Prisma.VerificationTokenCreateInput[] = [
  {
    email: "mario@kart.com",
    token: "ad937724-c1a8-451d-a143-9bcb0171141d",
    expiredAt: expDate,
  },
  {
    email: "yoshi@kart.com",
    token: "fa2cfc1f-64c3-4602-a6bb-264fabfe1007",
    expiredAt: expDate,
  },
  {
    email: "peach@kart.com",
    token: "d77a3f82-8ce3-43af-9178-51aaa4843846",
    expiredAt: expDate,
  },
];

async function main() {
  console.log(`Start seeding ...`);

  //ONLY IN DEV MODE ==============
  await prisma.user.deleteMany();
  await prisma.project.deleteMany();
  //==============

  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    });
    console.log(`Created user : ${user.email} verified at ${user.verifiedAt}`);
  }

  for (const u of verificationTokenData) {
    const verificationToken = await prisma.verificationToken.create({
      data: u,
    });

    console.log(
      `Created verification token for : ${verificationToken.email} expired at ${verificationToken.expiredAt}`
    );
  }

  //==============
  console.log(`Seeding finished.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
