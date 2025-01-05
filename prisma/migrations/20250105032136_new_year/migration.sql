/*
  Warnings:

  - The values [USER,ADMIN] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `emailVerified` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email_verification_token]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "next_auth"."Role_new" AS ENUM ('GUEST', 'MEMBER', 'COMPANY');
ALTER TABLE "next_auth"."users" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "public"."profiles" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "next_auth"."users" ALTER COLUMN "role" TYPE "next_auth"."Role_new" USING ("role"::text::"next_auth"."Role_new");
ALTER TABLE "public"."profiles" ALTER COLUMN "role" TYPE "next_auth"."Role_new" USING ("role"::text::"next_auth"."Role_new");
ALTER TYPE "next_auth"."Role" RENAME TO "Role_old";
ALTER TYPE "next_auth"."Role_new" RENAME TO "Role";
DROP TYPE "next_auth"."Role_old";
ALTER TABLE "next_auth"."users" ALTER COLUMN "role" SET DEFAULT 'GUEST';
ALTER TABLE "public"."profiles" ALTER COLUMN "role" SET DEFAULT 'GUEST';
COMMIT;

-- AlterTable
ALTER TABLE "next_auth"."users" DROP COLUMN "emailVerified",
ADD COLUMN     "email_verification_token" TEXT,
ADD COLUMN     "email_verified" TIMESTAMP(3),
ALTER COLUMN "role" SET DEFAULT 'GUEST';

-- AlterTable
ALTER TABLE "public"."profiles" ALTER COLUMN "role" SET DEFAULT 'GUEST';

-- CreateTable
CREATE TABLE "public"."newsletter_subscribers" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "newsletter_subscribers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "newsletter_subscribers_email_key" ON "public"."newsletter_subscribers"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_verification_token_key" ON "next_auth"."users"("email_verification_token");
