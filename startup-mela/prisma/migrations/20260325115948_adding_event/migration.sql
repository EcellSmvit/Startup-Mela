/*
  Warnings:

  - You are about to drop the column `selectedEvent` on the `UserDetails` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserDetails" DROP COLUMN "selectedEvent",
ADD COLUMN     "selectedEvents" TEXT[];
