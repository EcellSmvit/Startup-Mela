/*
  Warnings:

  - You are about to drop the column `PurchaseStatus` on the `Purchase` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Purchase" DROP COLUMN "PurchaseStatus",
ADD COLUMN     "purchaseStatus" "PurchaseStatus" NOT NULL DEFAULT 'PENDING';
