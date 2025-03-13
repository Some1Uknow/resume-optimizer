// app/prisma/prisma.ts
import { PrismaClient } from "@prisma/client"

// This works in both Edge and Node.js environments
const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma = globalForPrisma.prisma || new PrismaClient()

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma