/*
  Warnings:

  - You are about to drop the column `Interval` on the `Bounties` table. All the data in the column will be lost.
  - Added the required column `interval` to the `Bounties` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Bounties" DROP COLUMN "Interval",
ADD COLUMN     "interval" TIMESTAMP(3) NOT NULL;
