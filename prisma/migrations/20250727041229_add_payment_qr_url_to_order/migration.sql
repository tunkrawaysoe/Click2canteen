/*
  Warnings:

  - You are about to drop the column `deliveryPrice` on the `Restaurant` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "paymentUrl" TEXT;

-- AlterTable
ALTER TABLE "Restaurant" DROP COLUMN "deliveryPrice",
ADD COLUMN     "qrCodeUrl" TEXT;
