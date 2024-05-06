-- DropForeignKey
ALTER TABLE "Links" DROP CONSTRAINT "Links_profileId_fkey";

-- AddForeignKey
ALTER TABLE "Links" ADD CONSTRAINT "Links_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
