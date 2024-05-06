-- CreateEnum
CREATE TYPE "VendorCategory" AS ENUM ('VENDOR');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "categories" "VendorCategory"[];
