/*
  Warnings:

  - You are about to drop the column `question` on the `Bounties` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `BountyInput` table. All the data in the column will be lost.
  - You are about to drop the `GrantInput` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `GrantSubmisisons` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Grants` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProjectInputs` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProjectSubmissions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Projects` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Questions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "BountySubmissions" DROP CONSTRAINT "BountySubmissions_id_fkey";

-- DropForeignKey
ALTER TABLE "GrantInput" DROP CONSTRAINT "GrantInput_submissionId_fkey";

-- DropForeignKey
ALTER TABLE "GrantSubmisisons" DROP CONSTRAINT "GrantSubmisisons_grantId_fkey";

-- DropForeignKey
ALTER TABLE "GrantSubmisisons" DROP CONSTRAINT "GrantSubmisisons_userId_fkey";

-- DropForeignKey
ALTER TABLE "Grants" DROP CONSTRAINT "Grants_hostId_fkey";

-- DropForeignKey
ALTER TABLE "ProjectInputs" DROP CONSTRAINT "ProjectInputs_submissionId_fkey";

-- DropForeignKey
ALTER TABLE "ProjectSubmissions" DROP CONSTRAINT "ProjectSubmissions_projectId_fkey";

-- DropForeignKey
ALTER TABLE "ProjectSubmissions" DROP CONSTRAINT "ProjectSubmissions_userId_fkey";

-- DropForeignKey
ALTER TABLE "Projects" DROP CONSTRAINT "Projects_hostId_fkey";

-- DropForeignKey
ALTER TABLE "Questions" DROP CONSTRAINT "Questions_bountyId_fkey";

-- DropForeignKey
ALTER TABLE "Questions" DROP CONSTRAINT "Questions_grantId_fkey";

-- DropForeignKey
ALTER TABLE "Questions" DROP CONSTRAINT "Questions_projectId_fkey";

-- AlterTable
ALTER TABLE "Bounties" DROP COLUMN "question",
ADD COLUMN     "questions" TEXT[],
ADD COLUMN     "types" TEXT[],
ALTER COLUMN "type" SET NOT NULL,
ALTER COLUMN "type" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "BountyInput" DROP COLUMN "name",
ADD COLUMN     "answers" TEXT[],
ADD COLUMN     "question" TEXT[];

-- DropTable
DROP TABLE "GrantInput";

-- DropTable
DROP TABLE "GrantSubmisisons";

-- DropTable
DROP TABLE "Grants";

-- DropTable
DROP TABLE "ProjectInputs";

-- DropTable
DROP TABLE "ProjectSubmissions";

-- DropTable
DROP TABLE "Projects";

-- DropTable
DROP TABLE "Questions";

-- AddForeignKey
ALTER TABLE "BountySubmissions" ADD CONSTRAINT "BountySubmissions_bountyId_fkey" FOREIGN KEY ("bountyId") REFERENCES "Bounties"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
