/*
  Warnings:

  - A unique constraint covering the columns `[id,candidPubKey]` on the table `BountySubmissions` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "BountySubmissions_id_candidPubKey_key" ON "BountySubmissions"("id", "candidPubKey");
