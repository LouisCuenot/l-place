/*
  Warnings:

  - Added the required column `column` to the `Pixel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `row` to the `Pixel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pixel" ADD COLUMN     "column" INTEGER NOT NULL,
ADD COLUMN     "row" INTEGER NOT NULL;
