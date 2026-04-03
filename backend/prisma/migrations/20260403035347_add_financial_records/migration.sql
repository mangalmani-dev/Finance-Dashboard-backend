/*
  Warnings:

  - You are about to drop the column `description` on the `FinancialRecord` table. All the data in the column will be lost.
  - You are about to drop the column `transactionDate` on the `FinancialRecord` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `FinancialRecord` table. All the data in the column will be lost.
  - You are about to alter the column `amount` on the `FinancialRecord` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(12,2)`.
  - Added the required column `createdBy` to the `FinancialRecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date` to the `FinancialRecord` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `type` on the `FinancialRecord` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "RecordType" AS ENUM ('INCOME', 'EXPENSE');

-- DropForeignKey
ALTER TABLE "FinancialRecord" DROP CONSTRAINT "FinancialRecord_userId_fkey";

-- AlterTable
ALTER TABLE "FinancialRecord" DROP COLUMN "description",
DROP COLUMN "transactionDate",
DROP COLUMN "userId",
ADD COLUMN     "createdBy" INTEGER NOT NULL,
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "notes" TEXT,
ALTER COLUMN "amount" SET DATA TYPE DECIMAL(12,2),
DROP COLUMN "type",
ADD COLUMN     "type" "RecordType" NOT NULL;

-- AddForeignKey
ALTER TABLE "FinancialRecord" ADD CONSTRAINT "FinancialRecord_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
