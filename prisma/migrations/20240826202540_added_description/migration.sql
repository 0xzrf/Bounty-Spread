/*
  Warnings:

  - Added the required column `description` to the `Bounties` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Grants` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Projects` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Bounties" ADD COLUMN     "description" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Grants" ADD COLUMN     "description" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Projects" ADD COLUMN     "description" TEXT NOT NULL;
