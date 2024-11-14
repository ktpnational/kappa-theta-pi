-- DropForeignKey
ALTER TABLE "public"."Event" DROP CONSTRAINT "Event_chapterId_fkey";

-- AlterTable
ALTER TABLE "public"."Event" ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "chapterId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Event" ADD CONSTRAINT "Event_chapterId_fkey" FOREIGN KEY ("chapterId") REFERENCES "public"."chapters"("id") ON DELETE SET NULL ON UPDATE CASCADE;
