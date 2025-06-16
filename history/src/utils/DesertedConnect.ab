import { PrismaClient } from "@prisma/client";

let prisma;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = prisma || new PrismaClient();
  }
  prisma = new PrismaClient();
}

if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
} else {
  if (!global.prisma) {
    prisma = global.prisma;
  }

  prisma = global.prisma || new PrismaClient();
}

export default prisma;
