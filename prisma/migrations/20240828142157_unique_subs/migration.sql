/*
  Warnings:

  - A unique constraint covering the columns `[bountyId,candidPubKey]` on the table `BountySubmissions` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "BountySubmissions_id_candidPubKey_key";

-- CreateIndex
CREATE UNIQUE INDEX "BountySubmissions_bountyId_candidPubKey_key" ON "BountySubmissions"("bountyId", "candidPubKey");
