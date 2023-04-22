-- CreateTable
CREATE TABLE "Coder" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "key" TEXT NOT NULL,

    CONSTRAINT "Coder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CoderRepository" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "coderId" TEXT NOT NULL,
    "repositoryId" TEXT NOT NULL,

    CONSTRAINT "CoderRepository_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Repository" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Repository_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Coder_key_key" ON "Coder"("key");

-- CreateIndex
CREATE INDEX "Coder_key_idx" ON "Coder"("key");

-- CreateIndex
CREATE UNIQUE INDEX "CoderRepository_coderId_repositoryId_key" ON "CoderRepository"("coderId", "repositoryId");

-- CreateIndex
CREATE UNIQUE INDEX "Repository_key_key" ON "Repository"("key");

-- CreateIndex
CREATE INDEX "Repository_key_idx" ON "Repository"("key");

-- AddForeignKey
ALTER TABLE "CoderRepository" ADD CONSTRAINT "CoderRepository_coderId_fkey" FOREIGN KEY ("coderId") REFERENCES "Coder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoderRepository" ADD CONSTRAINT "CoderRepository_repositoryId_fkey" FOREIGN KEY ("repositoryId") REFERENCES "Repository"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
