-- AlterTable
ALTER TABLE "Host" ADD COLUMN     "freeTrials" INTEGER NOT NULL DEFAULT 5,
ADD COLUMN     "isPaid" BOOLEAN NOT NULL DEFAULT false;