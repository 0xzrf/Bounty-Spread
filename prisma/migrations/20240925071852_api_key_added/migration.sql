/*
  Warnings:

  - A unique constraint covering the columns `[apiKey]` on the table `Host` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `apiKey` to the `Host` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Host" ADD COLUMN     "apiKey" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Host_apiKey_key" ON "Host"("apiKey");
