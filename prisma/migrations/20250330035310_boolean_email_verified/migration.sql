/*
  Warnings:

  - The `email_verified` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "auth"."users" DROP COLUMN "email_verified",
ADD COLUMN     "email_verified" BOOLEAN;
