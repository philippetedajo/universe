import { Prisma, PrismaClient } from "@prisma/client";
import { treeTemplates } from "../src/constants/templates";

const prisma = new PrismaClient();

const date = new Date();
const expDate = new Date(new Date().setHours(new Date().getHours() + 2)); // 2 hours

const userData: Prisma.UserCreateInput[] = [
  {
    username: "Yoshi",
    email: "yoshi@kart.com",
    verifiedAt: date,
    password: "$2a$10$KwadqibaZsHdutG.1L8UcOqFK9.PGbgO2tRHZX602CkotjVN/llxy", // password
    projects: {
      create: [
        {
          title: "colorful-parallax",
          editor_input: treeTemplates._vanilla,
          description: "how to create colorful parallax",
          thumbnail:
            "https://cdn.dribbble.com/users/372/screenshots/13954804/media/ecb44e020eb98f4c3640777dea080c26.jpg?compress=1&resize=1600x1200",
        },
        {
          title: "moon-light",
          editor_input: treeTemplates._typescript,
          description: "a great moon",
          thumbnail:
            "https://cdn.dribbble.com/users/372/screenshots/13954804/media/ecb44e020eb98f4c3640777dea080c26.jpg?compress=1&resize=1600x1200",
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
          thumbnail:
            "https://cdn.dribbble.com/users/372/screenshots/13954804/media/ecb44e020eb98f4c3640777dea080c26.jpg?compress=1&resize=1600x1200",
        },
        {
          title: "potato",
          editor_input: treeTemplates._react,
          description: "whats a potato",
          thumbnail:
            "https://cdn.dribbble.com/users/372/screenshots/13954804/media/ecb44e020eb98f4c3640777dea080c26.jpg?compress=1&resize=1600x1200",
        },
        {
          title: "pringles-valley",
          editor_input: treeTemplates._react,
          description: "with pringles and chips",
          thumbnail:
            "https://cdn.dribbble.com/users/372/screenshots/13954804/media/ecb44e020eb98f4c3640777dea080c26.jpg?compress=1&resize=1600x1200",
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
