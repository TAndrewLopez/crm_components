import * as z from "zod";

import { bookmark, deposit, submission, user } from "@prisma/client";

export interface AuthUser extends user {
    bookmarks: bookmark[];
}

export interface ContactUser extends user {
    submissions: submission[];
    deposits: deposit[];
}

export interface ProfileSettings {
    bookmarkSortOption: "label" | "status" | "created_at";
    contactSortOption: "first_name" | "last_name" | "username" | "role";
    bookmarkSortDir: "asc" | "desc";
    contactSortDir: "asc" | "desc";
    showBirthday: "true" | "false";
    [key: string]: any;
}
