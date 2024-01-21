import { bookmark, submission, user } from "@prisma/client";

export interface ContactUser extends user {
    submissions: submission[]
}
export interface AuthUser extends user {
    bookmarks: bookmark[]
}