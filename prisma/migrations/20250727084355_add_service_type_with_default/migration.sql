/*
  Warnings:

  - The `serviceType` column on the `Order` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "ServiceType" AS ENUM ('SELF_SERVICE', 'DELIVERY');

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "serviceType",
ADD COLUMN     "serviceType" "ServiceType" NOT NULL DEFAULT 'SELF_SERVICE';
