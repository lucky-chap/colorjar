/*
  Warnings:

  - Added the required column `name` to the `Customized` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Extracted` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Generated` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Gradient` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Customized" ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Extracted" ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Generated" ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Gradient" ADD COLUMN     "name" TEXT NOT NULL;
