import * as z from "zod";

export const newBookmarkSchema = z.object({
    submission_id: z.number(),
    label: z.string(),
});
