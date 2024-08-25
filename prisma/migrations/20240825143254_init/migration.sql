-- CreateTable
CREATE TABLE "Host" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "publicKey" TEXT NOT NULL,

    CONSTRAINT "Host_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bounties" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "Interval" TIMESTAMP(3) NOT NULL,
    "hostId" INTEGER NOT NULL,

    CONSTRAINT "Bounties_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BountySubmissions" (
    "id" SERIAL NOT NULL,
    "userid" INTEGER NOT NULL,

    CONSTRAINT "BountySubmissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BountyInput" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "otherInfo" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,

    CONSTRAINT "BountyInput_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Questions" (
    "id" SERIAL NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "grantId" INTEGER NOT NULL,
    "bountyId" INTEGER NOT NULL,
    "projectId" INTEGER NOT NULL,

    CONSTRAINT "Questions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Grants" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "Interval" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Grants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GrantSubmisisons" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "GrantSubmisisons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GrantInput" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "otherInfo" TEXT NOT NULL,
    "projDescription" TEXT NOT NULL,
    "grantSubId" INTEGER NOT NULL,

    CONSTRAINT "GrantInput_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Projects" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "Interval" TIMESTAMP(3) NOT NULL,
    "hostId" INTEGER NOT NULL,

    CONSTRAINT "Projects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectSubmissions" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "projectId" INTEGER NOT NULL,

    CONSTRAINT "ProjectSubmissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectInputs" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "projectSubId" INTEGER NOT NULL,

    CONSTRAINT "ProjectInputs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "publicKey" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Host_email_key" ON "Host"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Host_username_key" ON "Host"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Host_publicKey_key" ON "Host"("publicKey");

-- CreateIndex
CREATE UNIQUE INDEX "Host_publicKey_email_key" ON "Host"("publicKey", "email");

-- CreateIndex
CREATE UNIQUE INDEX "Bounties_name_key" ON "Bounties"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Questions_grantId_key" ON "Questions"("grantId");

-- CreateIndex
CREATE UNIQUE INDEX "Questions_projectId_key" ON "Questions"("projectId");

-- CreateIndex
CREATE UNIQUE INDEX "GrantInput_grantSubId_key" ON "GrantInput"("grantSubId");

-- CreateIndex
CREATE UNIQUE INDEX "ProjectInputs_projectSubId_key" ON "ProjectInputs"("projectSubId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_publicKey_key" ON "User"("publicKey");

-- CreateIndex
CREATE UNIQUE INDEX "User_publicKey_email_key" ON "User"("publicKey", "email");

-- AddForeignKey
ALTER TABLE "Bounties" ADD CONSTRAINT "Bounties_id_fkey" FOREIGN KEY ("id") REFERENCES "Host"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BountySubmissions" ADD CONSTRAINT "BountySubmissions_userid_fkey" FOREIGN KEY ("userid") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BountySubmissions" ADD CONSTRAINT "BountySubmissions_id_fkey" FOREIGN KEY ("id") REFERENCES "Bounties"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BountyInput" ADD CONSTRAINT "BountyInput_id_fkey" FOREIGN KEY ("id") REFERENCES "BountySubmissions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Questions" ADD CONSTRAINT "Questions_bountyId_fkey" FOREIGN KEY ("bountyId") REFERENCES "BountyInput"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Questions" ADD CONSTRAINT "Questions_grantId_fkey" FOREIGN KEY ("grantId") REFERENCES "GrantInput"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Questions" ADD CONSTRAINT "Questions_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "ProjectInputs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Grants" ADD CONSTRAINT "Grants_id_fkey" FOREIGN KEY ("id") REFERENCES "Host"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GrantSubmisisons" ADD CONSTRAINT "GrantSubmisisons_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GrantSubmisisons" ADD CONSTRAINT "GrantSubmisisons_id_fkey" FOREIGN KEY ("id") REFERENCES "Grants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GrantInput" ADD CONSTRAINT "GrantInput_grantSubId_fkey" FOREIGN KEY ("grantSubId") REFERENCES "GrantSubmisisons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Projects" ADD CONSTRAINT "Projects_hostId_fkey" FOREIGN KEY ("hostId") REFERENCES "Host"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectSubmissions" ADD CONSTRAINT "ProjectSubmissions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectSubmissions" ADD CONSTRAINT "ProjectSubmissions_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectInputs" ADD CONSTRAINT "ProjectInputs_projectSubId_fkey" FOREIGN KEY ("projectSubId") REFERENCES "ProjectSubmissions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
