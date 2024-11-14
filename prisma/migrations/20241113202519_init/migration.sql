/*
  Warnings:

  - The `role` column on the `profiles` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "next_auth"."Role" AS ENUM ('GUEST', 'USER', 'ADMIN', 'COMPANY');

-- AlterTable
ALTER TABLE "next_auth"."users" ADD COLUMN     "isTwoFactorEnabled" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "role" "next_auth"."Role" NOT NULL DEFAULT 'USER',
ADD COLUMN     "twoFactorConfirmationId" TEXT;

-- AlterTable
ALTER TABLE "public"."profiles" DROP COLUMN "role",
ADD COLUMN     "role" "next_auth"."Role" NOT NULL DEFAULT 'USER';

-- DropEnum
DROP TYPE "public"."Role";
