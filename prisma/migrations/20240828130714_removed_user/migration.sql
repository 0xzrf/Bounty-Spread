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
    "amount" INTEGER NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "type" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "interval" TIMESTAMP(3) NOT NULL,
    "hostId" INTEGER NOT NULL,
    "questions" TEXT[],
    "types" TEXT[],

    CONSTRAINT "Bounties_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BountySubmissions" (
    "id" SERIAL NOT NULL,
    "bountyId" INTEGER NOT NULL,
    "candidPubKey" TEXT NOT NULL,
    "question" TEXT[],
    "answers" TEXT[],

    CONSTRAINT "BountySubmissions_pkey" PRIMARY KEY ("id")
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

-- AddForeignKey
ALTER TABLE "Bounties" ADD CONSTRAINT "Bounties_hostId_fkey" FOREIGN KEY ("hostId") REFERENCES "Host"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BountySubmissions" ADD CONSTRAINT "BountySubmissions_bountyId_fkey" FOREIGN KEY ("bountyId") REFERENCES "Bounties"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
