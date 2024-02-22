import * as z from "zod";

export const newBookmarkSchema = z.object({
    submission_id: z.number(),
    label: z.string(),
});

export const newNoteSchema = z.object({
    text: z.string(),
    submission_id: z.number(),
    user_id: z.number(),
});

export const userSortingSettingsSchema = z.object({
    showBirthday: z.boolean().default(true),
    contactSortOption: z
        .enum(["first_name", "last_name", "username",])
        .default("last_name"),
    contactSortDir: z.enum(["asc", "desc"]).default("asc"),
    bookmarkSortOption: z
        .enum(["label", "status", "created_at"])
        .default("created_at"),
    bookmarkSortDir: z.enum(["asc", "desc"]).default("desc"),
});

export const userPersonalSettingsSchema = z.object({
    showBirthday: z.boolean().default(true),
    firstName: z.string().min(1).max(255),
    lastName: z.string().min(1).max(255),
    username: z.string().min(1).max(255),
    email: z.string().email(),
    phoneNumber: z.number().min(1000000000).max(9999999999),
    imageURL: z.string().nullable(),
    userBio: z.string().nullable(),
    preferredPronouns: z.string().nullable(),
})

export const tattooInformationSchema = z.object({
    color: z.enum(["black_and_grey", "color"]),
    size: z.enum(["xsmall", "small", "medium", "large", "xlarge"]),
    placement: z
        .string()
        .min(1, "String must be more than 1 character.")
        .max(255, "String can't be longer than 255 characters."),
    description: z.string().min(1, "String must be more than 1 character."),
});

export const submissionReviewSchema = z.object({
    appointmentStatus: z.enum(['accepted', 'rejected']).nullable(),
    requiresConsultation: z.boolean().nullable(),
    requiredSessions: z.number().nullable(),
    rejectionReason: z.string().nullable(),
    otherReason: z.string().nullable(),
    referral: z.string().nullable(),
});

export const submissionAppointmentSchema = z.object({
    consultationDate: z.date().optional(),
    depositPaid: z.boolean().default(false),
    referenceImageURL: z.string().optional(),
});
