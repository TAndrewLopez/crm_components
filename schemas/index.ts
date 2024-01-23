import * as z from "zod";

export const newBookmarkSchema = z.object({
    submission_id: z.number(),
    label: z.string(),
});

export const userSettingsSchema = z.object({
    showBirthday: z.boolean().default(true),
    contactSortOption: z
    .enum(["first_name", "last_name", "username", "role"])
    .default("last_name"),
    contactSortDir: z.enum(["asc", "desc"]).default("asc"),
    bookmarkSortOption: z
        .enum(["label", "status", "created_at"])
        .default("created_at"),
    bookmarkSortDir: z.enum(["asc", "desc"]).default("desc"),
});
