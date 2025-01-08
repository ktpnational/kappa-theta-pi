/*
  Warnings:

  - The values [GUEST,MEMBER,COMPANY] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `Event` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `resources` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `rsvps` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "next_auth"."Role_new" AS ENUM ('SPONSOR');
ALTER TABLE "next_auth"."users" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "public"."profiles" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "next_auth"."users" ALTER COLUMN "role" TYPE "next_auth"."Role_new" USING ("role"::text::"next_auth"."Role_new");
ALTER TABLE "public"."profiles" ALTER COLUMN "role" TYPE "next_auth"."Role_new" USING ("role"::text::"next_auth"."Role_new");
ALTER TYPE "next_auth"."Role" RENAME TO "Role_old";
ALTER TYPE "next_auth"."Role_new" RENAME TO "Role";
DROP TYPE "next_auth"."Role_old";
ALTER TABLE "next_auth"."users" ALTER COLUMN "role" SET DEFAULT 'SPONSOR';
ALTER TABLE "public"."profiles" ALTER COLUMN "role" SET DEFAULT 'SPONSOR';
COMMIT;

-- DropForeignKey
ALTER TABLE "public"."Event" DROP CONSTRAINT "Event_chapterId_fkey";

-- DropForeignKey
ALTER TABLE "public"."resources" DROP CONSTRAINT "resources_chapterId_fkey";

-- DropForeignKey
ALTER TABLE "public"."resources" DROP CONSTRAINT "resources_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."rsvps" DROP CONSTRAINT "rsvps_eventId_fkey";

-- DropForeignKey
ALTER TABLE "public"."rsvps" DROP CONSTRAINT "rsvps_userId_fkey";

-- AlterTable
ALTER TABLE "next_auth"."users" ALTER COLUMN "role" SET DEFAULT 'SPONSOR';

-- AlterTable
ALTER TABLE "public"."profiles" ALTER COLUMN "role" SET DEFAULT 'SPONSOR';

-- DropTable
DROP TABLE "public"."Event";

-- DropTable
DROP TABLE "public"."resources";

-- DropTable
DROP TABLE "public"."rsvps";
