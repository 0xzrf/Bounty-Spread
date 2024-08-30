/*
  Warnings:

  - The primary key for the `Bounties` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "BountySubmissions" DROP CONSTRAINT "BountySubmissions_bountyId_fkey";

-- AlterTable
ALTER TABLE "Bounties" DROP CONSTRAINT "Bounties_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Bounties_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Bounties_id_seq";

-- AlterTable
ALTER TABLE "BountySubmissions" ALTER COLUMN "bountyId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "BountySubmissions" ADD CONSTRAINT "BountySubmissions_bountyId_fkey" FOREIGN KEY ("bountyId") REFERENCES "Bounties"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
