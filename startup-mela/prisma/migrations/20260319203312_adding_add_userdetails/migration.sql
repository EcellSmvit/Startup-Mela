-- CreateTable
CREATE TABLE "UserDetails" (
    "id" TEXT NOT NULL,
    "usn" TEXT NOT NULL,
    "mobileNumber" TEXT NOT NULL,
    "isSmvit" BOOLEAN NOT NULL DEFAULT true,
    "collegeName" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "UserDetails_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserDetails_userId_key" ON "UserDetails"("userId");

-- AddForeignKey
ALTER TABLE "UserDetails" ADD CONSTRAINT "UserDetails_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
