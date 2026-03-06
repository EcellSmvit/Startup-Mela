/*
  Warnings:

  - You are about to drop the column `purchaseStatus` on the `Purchase` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Purchase" DROP COLUMN "purchaseStatus",
ADD COLUMN     "PurchaseStatus" "PurchaseStatus" NOT NULL DEFAULT 'PENDING';
