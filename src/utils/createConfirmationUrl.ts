import { v4 } from "uuid";
import { prisma } from "../services";

export async function createConfirmationUrl(email: string, path?: string) {
  const vtTest = await prisma.verificationToken.findFirst({
    where: { email: email },
  });

  if (vtTest)
    await prisma.verificationToken.delete({ where: { id: vtTest.id } });

  const vt = await prisma.verificationToken.create({
    data: {
      email: email,
      token: v4(),
      expiredAt: new Date(new Date().setHours(new Date().getHours() + 2)), // 2 hours
    },
  });

  if (!vt) await createConfirmationUrl(email);
  return `${process.env.APP_URL}${path}?tx=${vt.token}`; // redirect frontend url
}
