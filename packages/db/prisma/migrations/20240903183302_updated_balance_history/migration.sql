/*
  Warnings:

  - Added the required column `Date` to the `BalanceHistory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BalanceHistory" ADD COLUMN     "Date" TIMESTAMP(3) NOT NULL;
