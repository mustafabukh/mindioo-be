-- CreateEnum
CREATE TYPE "PostType" AS ENUM ('TEXT', 'VIDEO', 'IMAGE', 'AUDIO');

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_fkey";

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "description" TEXT,
ADD COLUMN     "media" TEXT[],
ADD COLUMN     "postType" "PostType" NOT NULL DEFAULT 'TEXT';

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
