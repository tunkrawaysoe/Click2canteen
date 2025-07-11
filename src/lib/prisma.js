import { PrismaClient } from "@/generated/prisma";

let prisma;

if (typeof global !== 'undefined') {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
} else {
  prisma = new PrismaClient();
}

export default prisma;
