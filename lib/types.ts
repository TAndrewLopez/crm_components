import { bookmark, deposit, submission, user } from "@prisma/client";

export interface AuthUser extends user {
    bookmarks: bookmark[];
}

export interface ContactUser extends user {
    submissions: submission[];
    deposits: deposit[];
}