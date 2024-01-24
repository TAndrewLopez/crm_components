import { Prisma, deposit, submission, user } from "@prisma/client";

export interface ContactUser extends user {
    submissions: submission[];
    deposits: deposit[];
}

const subContact = Prisma.validator<Prisma.submissionDefaultArgs>()({
    select: {
        name: true,
        email: true,
        phone_number: true,
        preferred_pronouns: true,
        user_id: true,
    },
});

const authUser = Prisma.validator<Prisma.userDefaultArgs>()({
    include: { bookmarks: true },
});

const submissionWithUser = Prisma.validator<Prisma.submissionDefaultArgs>()({
    include: { user: true },
});

export type SubContact = Prisma.submissionGetPayload<typeof subContact>;
export type AuthUser = Prisma.userGetPayload<typeof authUser>;
export type SubmissionWithUser = Prisma.submissionGetPayload<
    typeof submissionWithUser
>;
