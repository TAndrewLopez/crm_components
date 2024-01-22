import * as z from "zod";

export const newBookmarkSchema = z.object({
    submission_id: z.number(),
    label: z.string(),
});

export const bookmarkSortingSchema = z.object({
    sort_by: z.enum(['created_at', 'status', 'label']),
    direction: z.enum(['asc', 'desc'])
})

export const contactSortingSchema = z.object({
    sort_by: z.enum(['first_name', 'last_name', 'username', 'role']),
    direction: z.enum(['asc', 'desc'])
})

export const personalSettingSchema = z.object({
    showBirthday: z.boolean().default(true)
})