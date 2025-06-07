-- CreateEnum
CREATE TYPE "auth"."Role" AS ENUM ('GUEST', 'MEMBER', 'COMPANY');

-- CreateEnum
CREATE TYPE "public"."CandidateStatus" AS ENUM ('PENDING', 'REVIEWING', 'INTERVIEWED', 'OFFERED', 'REJECTED');

-- CreateTable
CREATE TABLE "auth"."users" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "email_verified" TIMESTAMP(3),
    "email_verification_token" TEXT,
    "image" TEXT,
    "password" TEXT,
    "role" "auth"."Role" NOT NULL DEFAULT 'MEMBER',
    "isTwoFactorEnabled" BOOLEAN NOT NULL DEFAULT false,
    "twoFactorConfirmationId" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "auth"."accounts" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "auth"."sessions" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "auth"."verification_tokens" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "verification_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "auth"."password_reset_tokens" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "password_reset_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "auth"."two_factor_tokens" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "two_factor_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "auth"."two_factor_confirmations" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "two_factor_confirmations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."profiles" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "role" "auth"."Role" NOT NULL DEFAULT 'MEMBER',
    "active" BOOLEAN NOT NULL DEFAULT true,
    "version" TEXT,
    "photoUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."addresses" (
    "id" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,
    "line1" TEXT NOT NULL,
    "line2" TEXT,
    "city" TEXT NOT NULL,
    "province" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "zip" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "addresses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."members" (
    "id" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,
    "resumeId" TEXT NOT NULL,
    "chapterId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "members_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."resumes" (
    "id" TEXT NOT NULL,
    "education" JSONB,
    "experience" JSONB,
    "skills" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "resumes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."companies" (
    "id" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "website" TEXT,
    "industry" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "companies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."candidates" (
    "id" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "memberId" TEXT NOT NULL,
    "status" "public"."CandidateStatus" NOT NULL DEFAULT 'PENDING',
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "candidates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."chapters" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "greekName" TEXT NOT NULL,
    "foundingDate" TIMESTAMP(3) NOT NULL,
    "university" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "chapters_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "auth"."users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_verification_token_key" ON "auth"."users"("email_verification_token");

-- CreateIndex
CREATE UNIQUE INDEX "accounts_provider_providerAccountId_key" ON "auth"."accounts"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_sessionToken_key" ON "auth"."sessions"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "verification_tokens_token_key" ON "auth"."verification_tokens"("token");

-- CreateIndex
CREATE UNIQUE INDEX "verification_tokens_email_token_key" ON "auth"."verification_tokens"("email", "token");

-- CreateIndex
CREATE UNIQUE INDEX "password_reset_tokens_token_key" ON "auth"."password_reset_tokens"("token");

-- CreateIndex
CREATE UNIQUE INDEX "password_reset_tokens_email_token_key" ON "auth"."password_reset_tokens"("email", "token");

-- CreateIndex
CREATE UNIQUE INDEX "two_factor_tokens_token_key" ON "auth"."two_factor_tokens"("token");

-- CreateIndex
CREATE UNIQUE INDEX "two_factor_tokens_email_token_key" ON "auth"."two_factor_tokens"("email", "token");

-- CreateIndex
CREATE UNIQUE INDEX "two_factor_confirmations_userId_key" ON "auth"."two_factor_confirmations"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "profiles_userId_key" ON "public"."profiles"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "addresses_profileId_key" ON "public"."addresses"("profileId");

-- CreateIndex
CREATE UNIQUE INDEX "members_profileId_key" ON "public"."members"("profileId");

-- CreateIndex
CREATE UNIQUE INDEX "members_resumeId_key" ON "public"."members"("resumeId");

-- CreateIndex
CREATE UNIQUE INDEX "companies_profileId_key" ON "public"."companies"("profileId");

-- CreateIndex
CREATE UNIQUE INDEX "candidates_companyId_memberId_key" ON "public"."candidates"("companyId", "memberId");

-- CreateIndex
CREATE UNIQUE INDEX "chapters_name_key" ON "public"."chapters"("name");

-- AddForeignKey
ALTER TABLE "auth"."accounts" ADD CONSTRAINT "accounts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "auth"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "auth"."sessions" ADD CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "auth"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "auth"."two_factor_confirmations" ADD CONSTRAINT "two_factor_confirmations_userId_fkey" FOREIGN KEY ("userId") REFERENCES "auth"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."profiles" ADD CONSTRAINT "profiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "auth"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."addresses" ADD CONSTRAINT "addresses_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "public"."profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."members" ADD CONSTRAINT "members_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "public"."profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."members" ADD CONSTRAINT "members_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "public"."resumes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."members" ADD CONSTRAINT "members_chapterId_fkey" FOREIGN KEY ("chapterId") REFERENCES "public"."chapters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."companies" ADD CONSTRAINT "companies_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "public"."profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."candidates" ADD CONSTRAINT "candidates_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "public"."companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."candidates" ADD CONSTRAINT "candidates_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "public"."members"("id") ON DELETE CASCADE ON UPDATE CASCADE;
