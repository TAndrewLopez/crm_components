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

export const initialDataSchema = z.object({
    placement: z
        .string()
        .min(1, "String must be more than 1 character.")
        .max(255, "String can't be longer than 255 characters."),
    size: z
        .string()
        .min(1, "String must be more than 1 character.")
        .max(255, "String can't be longer than 255 characters."),
    color: z.enum(["black_and_grey", "color"]),
    description: z
        .string()
        .min(1, "String must be more than 1 character.")
        .max(255, "String can't be longer than 255 characters."),
});

export const initialAppointmentSchema = z.object({
    appointmentStatus: z.boolean().optional(),
    consultationRequired: z.boolean().optional(),
    sessionAmount: z.number().optional(),
})

export const reviewAppointmentSchema = z.object({
    consultationDate: z.date().optional(),
    depositPaid: z.boolean().default(false),
    rejectionReason: z.string().optional(),
    otherReason: z.string().optional(),
    referral: z.string().optional(),
    referenceImageURL: z.string().optional(),
})