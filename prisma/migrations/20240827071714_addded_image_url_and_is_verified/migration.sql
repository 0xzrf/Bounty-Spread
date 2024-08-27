/*
  Warnings:

  - Added the required column `imageUrl` to the `Bounties` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Bounties" ADD COLUMN     "imageUrl" TEXT NOT NULL,
ADD COLUMN     "isVerified" BOOLEAN NOT NULL DEFAULT false;
