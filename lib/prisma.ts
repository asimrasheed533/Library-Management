import { PrismaClient } from "@prisma/client";

var prisma: PrismaClient | undefined;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!prisma) {
    prisma = new PrismaClient();
  }
}

export default prisma as PrismaClient;
