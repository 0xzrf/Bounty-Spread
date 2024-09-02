import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const prisma = new PrismaClient().$extends(withAccelerate())

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
  }