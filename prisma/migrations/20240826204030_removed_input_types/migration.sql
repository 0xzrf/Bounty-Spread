/*
  Warnings:

  - You are about to drop the `InputTypes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "InputTypes" DROP CONSTRAINT "InputTypes_bountyId_fkey";

-- DropForeignKey
ALTER TABLE "InputTypes" DROP CONSTRAINT "InputTypes_grantId_fkey";

-- DropForeignKey
ALTER TABLE "InputTypes" DROP CONSTRAINT "InputTypes_projectId_fkey";

-- AlterTable
ALTER TABLE "Bounties" ADD COLUMN     "question" TEXT[],
ADD COLUMN     "type" TEXT[];

-- AlterTable
ALTER TABLE "Grants" ADD COLUMN     "question" TEXT[],
ADD COLUMN     "type" TEXT[];

-- AlterTable
ALTER TABLE "Projects" ADD COLUMN     "question" TEXT[],
ADD COLUMN     "type" TEXT[];

-- DropTable
DROP TABLE "InputTypes";
