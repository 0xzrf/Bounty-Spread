/*
  Warnings:

  - The `question` column on the `InputTypes` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `type` column on the `InputTypes` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "InputTypes" DROP COLUMN "question",
ADD COLUMN     "question" TEXT[],
DROP COLUMN "type",
ADD COLUMN     "type" TEXT[];
