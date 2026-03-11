/*
  Warnings:

  - A unique constraint covering the columns `[uniqueUserCode]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "Mobnumber" INTEGER,
ADD COLUMN     "uniqueUserCode" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_uniqueUserCode_key" ON "User"("uniqueUserCode");
