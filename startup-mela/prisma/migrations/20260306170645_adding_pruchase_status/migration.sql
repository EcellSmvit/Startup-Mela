-- CreateEnum
CREATE TYPE "purchaseStatus" AS ENUM ('PENDING', 'COMPLETED', 'CANCELLED');

-- AlterTable
ALTER TABLE "Purchase" ADD COLUMN     "purchaseStatus" "purchaseStatus" NOT NULL DEFAULT 'PENDING';
