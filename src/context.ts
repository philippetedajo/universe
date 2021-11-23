import { PrismaClient } from "@prisma/client";
import { prisma } from "./services";

export interface Context {
  prisma: PrismaClient;
  req: any;
  userId?: number;
}

export const createContext = (req: any) => {
  return {
    ...req,
    prisma,
  };
};
