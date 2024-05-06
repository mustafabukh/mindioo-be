/*
  Warnings:

  - The values [VENDOR] on the enum `VendorCategory` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "VendorCategory_new" AS ENUM ('PSYCHIATRIST', 'HEALER', 'THERAPIST', 'CAT4', 'CAT5', 'CAT6');
ALTER TABLE "User" ALTER COLUMN "categories" TYPE "VendorCategory_new"[] USING ("categories"::text::"VendorCategory_new"[]);
ALTER TYPE "VendorCategory" RENAME TO "VendorCategory_old";
ALTER TYPE "VendorCategory_new" RENAME TO "VendorCategory";
DROP TYPE "VendorCategory_old";
COMMIT;
