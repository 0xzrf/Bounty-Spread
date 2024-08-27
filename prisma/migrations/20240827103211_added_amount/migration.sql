/*
  Warnings:

  - You are about to drop the column `amount` on the `BountyInput` table. All the data in the column will be lost.
  - Added the required column `amount` to the `Bounties` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Bounties" ADD COLUMN     "amount" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "BountyInput" DROP COLUMN "amount";
