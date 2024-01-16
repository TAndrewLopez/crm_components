/*
  Warnings:

  - You are about to drop the `submission` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Color" AS ENUM ('black and grey', 'color');

-- DropTable
DROP TABLE "submission";

-- DropEnum
DROP TYPE "color";

-- CreateTable
CREATE TABLE "Submission" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "phone_number" VARCHAR(255) NOT NULL,
    "preferred_pronouns" VARCHAR(255),
    "description" TEXT NOT NULL,
    "size" VARCHAR(255) NOT NULL,
    "placement" VARCHAR(255) NOT NULL,
    "color" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Submission_pkey" PRIMARY KEY ("id")
);
