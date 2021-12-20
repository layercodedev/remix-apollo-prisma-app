import { PrismaClient } from "@prisma/client";

declare global {
  // eslint-disable-next-line no-var,vars-on-top
  var cachedPrisma: PrismaClient;
}

// Workaround to make Prisma Client work well during "next dev"
// @see https://www.prisma.io/docs/support/help-articles/nextjs-prisma-client-dev-practices
// eslint-disable-next-line import/no-mutable-exports
let prisma: PrismaClient;
const optlog = {
  log: ["query", "info", "warn", "error"] as any[],
};
const opt = process.env.DB_LOG === "true" ? optlog : { log: [] };

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient({ log: ["error"] });
} else {
  if (!global.cachedPrisma) {
    global.cachedPrisma = new PrismaClient(opt);
  }
  prisma = global.cachedPrisma;
}

export default prisma;
