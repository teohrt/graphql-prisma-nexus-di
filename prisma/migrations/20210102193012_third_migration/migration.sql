-- AlterTable
ALTER TABLE "User" ADD COLUMN     "bio" TEXT,
ADD COLUMN     "jobTitle" TEXT NOT NULL DEFAULT E'Blogger';
