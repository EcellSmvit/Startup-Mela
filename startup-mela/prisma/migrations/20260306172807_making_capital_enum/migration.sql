/*
  Warnings:

  - The `purchaseStatus` column on the `Purchase` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "PurchaseStatus" AS ENUM ('PENDING', 'COMPLETED', 'CANCELLED');

-- AlterTable
ALTER TABLE "Purchase" DROP COLUMN "purchaseStatus",
ADD COLUMN     "purchaseStatus" "PurchaseStatus" NOT NULL DEFAULT 'PENDING';

-- DropEnum
DROP TYPE "purchaseStatus";
