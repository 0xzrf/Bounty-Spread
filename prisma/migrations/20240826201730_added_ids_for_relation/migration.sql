/*
  Warnings:

  - A unique constraint covering the columns `[submissionId]` on the table `BountyInput` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[submissionId]` on the table `GrantInput` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[submissionId]` on the table `ProjectInputs` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `hostId` to the `Bounties` table without a default value. This is not possible if the table is not empty.
  - Added the required column `submissionId` to the `BountyInput` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bountyId` to the `BountySubmissions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `submissionId` to the `GrantInput` table without a default value. This is not possible if the table is not empty.
  - Added the required column `grantId` to the `GrantSubmisisons` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hostId` to the `Grants` table without a default value. This is not possible if the table is not empty.
  - Added the required column `submissionId` to the `ProjectInputs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `projectId` to the `ProjectSubmissions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hostId` to the `Projects` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Bounties" DROP CONSTRAINT "Bounties_id_fkey";

-- DropForeignKey
ALTER TABLE "BountyInput" DROP CONSTRAINT "BountyInput_id_fkey";

-- DropForeignKey
ALTER TABLE "GrantInput" DROP CONSTRAINT "GrantInput_id_fkey";

-- DropForeignKey
ALTER TABLE "GrantSubmisisons" DROP CONSTRAINT "GrantSubmisisons_id_fkey";

-- DropForeignKey
ALTER TABLE "Grants" DROP CONSTRAINT "Grants_id_fkey";

-- DropForeignKey
ALTER TABLE "ProjectInputs" DROP CONSTRAINT "ProjectInputs_id_fkey";

-- DropForeignKey
ALTER TABLE "ProjectSubmissions" DROP CONSTRAINT "ProjectSubmissions_id_fkey";

-- DropForeignKey
ALTER TABLE "Projects" DROP CONSTRAINT "Projects_id_fkey";

-- AlterTable
ALTER TABLE "Bounties" ADD COLUMN     "hostId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "BountyInput" ADD COLUMN     "submissionId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "BountySubmissions" ADD COLUMN     "bountyId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "GrantInput" ADD COLUMN     "submissionId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "GrantSubmisisons" ADD COLUMN     "grantId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Grants" ADD COLUMN     "hostId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "InputTypes" ALTER COLUMN "grantId" DROP DEFAULT,
ALTER COLUMN "bountyId" DROP DEFAULT,
ALTER COLUMN "projectId" DROP DEFAULT;
DROP SEQUENCE "inputtypes_grantid_seq";
DROP SEQUENCE "inputtypes_bountyid_seq";
DROP SEQUENCE "inputtypes_projectid_seq";

-- AlterTable
ALTER TABLE "ProjectInputs" ADD COLUMN     "submissionId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "ProjectSubmissions" ADD COLUMN     "projectId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Projects" ADD COLUMN     "hostId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "BountyInput_submissionId_key" ON "BountyInput"("submissionId");

-- CreateIndex
CREATE UNIQUE INDEX "GrantInput_submissionId_key" ON "GrantInput"("submissionId");

-- CreateIndex
CREATE UNIQUE INDEX "ProjectInputs_submissionId_key" ON "ProjectInputs"("submissionId");

-- AddForeignKey
ALTER TABLE "Bounties" ADD CONSTRAINT "Bounties_hostId_fkey" FOREIGN KEY ("hostId") REFERENCES "Host"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BountyInput" ADD CONSTRAINT "BountyInput_submissionId_fkey" FOREIGN KEY ("submissionId") REFERENCES "BountySubmissions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Grants" ADD CONSTRAINT "Grants_hostId_fkey" FOREIGN KEY ("hostId") REFERENCES "Host"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GrantSubmisisons" ADD CONSTRAINT "GrantSubmisisons_grantId_fkey" FOREIGN KEY ("grantId") REFERENCES "Grants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GrantInput" ADD CONSTRAINT "GrantInput_submissionId_fkey" FOREIGN KEY ("submissionId") REFERENCES "GrantSubmisisons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Projects" ADD CONSTRAINT "Projects_hostId_fkey" FOREIGN KEY ("hostId") REFERENCES "Host"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectSubmissions" ADD CONSTRAINT "ProjectSubmissions_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectInputs" ADD CONSTRAINT "ProjectInputs_submissionId_fkey" FOREIGN KEY ("submissionId") REFERENCES "ProjectSubmissions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
