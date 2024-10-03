-- AlterTable
ALTER TABLE "Bounties" ADD COLUMN     "usernames" TEXT[] DEFAULT ARRAY[]::TEXT[];
