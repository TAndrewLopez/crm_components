import { Prisma, deposit, submission, user } from "@prisma/client";

export interface ContactUser extends user {
    submissions: submission[];
    deposits: deposit[];
}

const authUser = Prisma.validator<Prisma.userDefaultArgs>()({
    include: { bookmarks: true }
})

const submissionWithUser = Prisma.validator<Prisma.submissionDefaultArgs>()({
    include: { user: true }
})

export type AuthUser = Prisma.userGetPayload<typeof authUser>
export type SubmissionWithUser = Prisma.submissionGetPayload<typeof submissionWithUser>