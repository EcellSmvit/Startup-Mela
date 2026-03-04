/*
  Warnings:

  - Added the required column `limit` to the `Pass` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pass" ADD COLUMN     "limit" INTEGER NOT NULL,
ADD COLUMN     "sold" INTEGER NOT NULL DEFAULT 0;
