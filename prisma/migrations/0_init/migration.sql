-- CreateEnum
CREATE TYPE "color" AS ENUM ('black and grey', 'color');

-- CreateTable
CREATE TABLE "submission" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255),
    "email" VARCHAR(255),
    "phone_number" VARCHAR(255),
    "preferred_pronouns" VARCHAR(255),
    "description" TEXT,
    "size" VARCHAR(255),
    "placement" VARCHAR(255),
    "color" VARCHAR(255),

    CONSTRAINT "submission_pkey" PRIMARY KEY ("id")
);

