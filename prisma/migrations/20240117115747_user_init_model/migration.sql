/*
  Warnings:

  - You are about to drop the `Submission` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "tattooColor" AS ENUM ('black and grey', 'color');

-- CreateEnum
CREATE TYPE "submissionStatus" AS ENUM ('unread', 'read');

-- CreateEnum
CREATE TYPE "role" AS ENUM ('user', 'admin', 'dev');

-- DropTable
DROP TABLE "Submission";

-- DropEnum
DROP TYPE "Color";

-- CreateTable
CREATE TABLE "submission" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "phone_number" VARCHAR(255) NOT NULL,
    "preferred_pronouns" VARCHAR(255),
    "description" TEXT NOT NULL,
    "size" VARCHAR(255) NOT NULL,
    "placement" VARCHAR(255) NOT NULL,
    "color" "tattooColor" NOT NULL,
    "status" "submissionStatus" NOT NULL DEFAULT 'unread',
    "authorID" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "submission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "phone_number" VARCHAR(255) NOT NULL,
    "role" "role" NOT NULL DEFAULT 'user',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "submission" ADD CONSTRAINT "submission_authorID_fkey" FOREIGN KEY ("authorID") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
