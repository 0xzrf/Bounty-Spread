/*
  Warnings:

  - You are about to drop the column `hostId` on the `Bounties` table. All the data in the column will be lost.
  - You are about to drop the column `grantSubId` on the `GrantInput` table. All the data in the column will be lost.
  - You are about to drop the column `projectSubId` on the `ProjectInputs` table. All the data in the column will be lost.
  - You are about to drop the column `projectId` on the `ProjectSubmissions` table. All the data in the column will be lost.
  - You are about to drop the column `hostId` on the `Projects` table. All the data in the column will be lost.
  - Added the required column `amount` to the `GrantInput` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "GrantInput" DROP CONSTRAINT "GrantInput_grantSubId_fkey";

-- DropForeignKey
ALTER TABLE "ProjectInputs" DROP CONSTRAINT "ProjectInputs_projectSubId_fkey";

-- DropForeignKey
ALTER TABLE "ProjectSubmissions" DROP CONSTRAINT "ProjectSubmissions_projectId_fkey";

-- DropForeignKey
ALTER TABLE "Projects" DROP CONSTRAINT "Projects_hostId_fkey";

-- DropIndex
DROP INDEX "GrantInput_grantSubId_key";

-- DropIndex
DROP INDEX "ProjectInputs_projectSubId_key";

-- AlterTable
ALTER TABLE "Bounties" DROP COLUMN "hostId";

-- AlterTable
ALTER TABLE "GrantInput" DROP COLUMN "grantSubId",
ADD COLUMN     "amount" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "ProjectInputs" DROP COLUMN "projectSubId";

-- AlterTable
ALTER TABLE "ProjectSubmissions" DROP COLUMN "projectId";

-- AlterTable
ALTER TABLE "Projects" DROP COLUMN "hostId";

-- CreateTable
CREATE TABLE "InputTypes" (
    "id" SERIAL NOT NULL,
    "question" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "grantId" INTEGER NOT NULL,
    "bountyId" INTEGER NOT NULL,
    "projectId" INTEGER NOT NULL,

    CONSTRAINT "InputTypes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "InputTypes_grantId_key" ON "InputTypes"("grantId");

-- CreateIndex
CREATE UNIQUE INDEX "InputTypes_bountyId_key" ON "InputTypes"("bountyId");

-- CreateIndex
CREATE UNIQUE INDEX "InputTypes_projectId_key" ON "InputTypes"("projectId");

-- AddForeignKey
ALTER TABLE "InputTypes" ADD CONSTRAINT "InputTypes_grantId_fkey" FOREIGN KEY ("grantId") REFERENCES "Grants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InputTypes" ADD CONSTRAINT "InputTypes_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InputTypes" ADD CONSTRAINT "InputTypes_bountyId_fkey" FOREIGN KEY ("bountyId") REFERENCES "Bounties"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GrantInput" ADD CONSTRAINT "GrantInput_id_fkey" FOREIGN KEY ("id") REFERENCES "GrantSubmisisons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Projects" ADD CONSTRAINT "Projects_id_fkey" FOREIGN KEY ("id") REFERENCES "Host"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectSubmissions" ADD CONSTRAINT "ProjectSubmissions_id_fkey" FOREIGN KEY ("id") REFERENCES "Projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectInputs" ADD CONSTRAINT "ProjectInputs_id_fkey" FOREIGN KEY ("id") REFERENCES "ProjectSubmissions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
