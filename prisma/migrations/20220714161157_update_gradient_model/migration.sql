/*
  Warnings:

  - You are about to drop the column `colors` on the `Gradient` table. All the data in the column will be lost.
  - Added the required column `direction` to the `Gradient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fromValue` to the `Gradient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `toValue` to the `Gradient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `viaValue` to the `Gradient` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Gradient" DROP COLUMN "colors",
ADD COLUMN     "direction" TEXT NOT NULL,
ADD COLUMN     "fromValue" TEXT NOT NULL,
ADD COLUMN     "toValue" TEXT NOT NULL,
ADD COLUMN     "viaValue" TEXT NOT NULL;
