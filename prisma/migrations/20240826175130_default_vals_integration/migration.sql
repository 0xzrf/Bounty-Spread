/*
  Warnings:

  - A unique constraint covering the columns `[bountyId]` on the table `Questions` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
CREATE SEQUENCE inputtypes_grantid_seq;
CREATE SEQUENCE inputtypes_bountyid_seq;
CREATE SEQUENCE inputtypes_projectid_seq;
ALTER TABLE "InputTypes" ALTER COLUMN "grantId" SET DEFAULT nextval('inputtypes_grantid_seq'),
ALTER COLUMN "bountyId" SET DEFAULT nextval('inputtypes_bountyid_seq'),
ALTER COLUMN "projectId" SET DEFAULT nextval('inputtypes_projectid_seq');
ALTER SEQUENCE inputtypes_grantid_seq OWNED BY "InputTypes"."grantId";
ALTER SEQUENCE inputtypes_bountyid_seq OWNED BY "InputTypes"."bountyId";
ALTER SEQUENCE inputtypes_projectid_seq OWNED BY "InputTypes"."projectId";

-- AlterTable
CREATE SEQUENCE questions_grantid_seq;
CREATE SEQUENCE questions_bountyid_seq;
CREATE SEQUENCE questions_projectid_seq;
ALTER TABLE "Questions" ALTER COLUMN "grantId" SET DEFAULT nextval('questions_grantid_seq'),
ALTER COLUMN "bountyId" SET DEFAULT nextval('questions_bountyid_seq'),
ALTER COLUMN "projectId" SET DEFAULT nextval('questions_projectid_seq');
ALTER SEQUENCE questions_grantid_seq OWNED BY "Questions"."grantId";
ALTER SEQUENCE questions_bountyid_seq OWNED BY "Questions"."bountyId";
ALTER SEQUENCE questions_projectid_seq OWNED BY "Questions"."projectId";

-- CreateIndex
CREATE UNIQUE INDEX "Questions_bountyId_key" ON "Questions"("bountyId");
