"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { submission } from "@prisma/client";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { WidgetWrapper } from "@/components/widgetWrapper";
import { submissionReviewSchema } from "@/schemas";
import { WidgetFormAction } from "./widgetFormAction";

type Props = {
    submission: submission;
};

export const ReviewWidget = ({ submission }: Props) => {
    const [editEnabled, setEditEnabled] = useState(false);
    const [isPending, startTransition] = useTransition();
    const form = useForm<z.infer<typeof submissionReviewSchema>>({
        resolver: zodResolver(submissionReviewSchema),
        defaultValues: {
            appointmentStatus: submission.appointment_status,
            requiresConsultation: submission.requires_consultation,
            requiredSessions: submission.required_sessions,
            rejectionReason: submission.rejection_reason,
            otherReason: submission.other_reason,
            referral: submission.referral,
        },
    });

    const handleSubmit = (
        values: z.infer<typeof submissionReviewSchema>
    ) => {
        const validatedFields = submissionReviewSchema.safeParse(values);
        if (!validatedFields.success) return toast.error("Invalid Fields.");
        console.log("submit form", values);
    };

    const handleToggle = () => {
        editEnabled ? setEditEnabled(false) : setEditEnabled(true);
        form.reset();
    };

    return (
        <WidgetWrapper
            className="flex-1"
            title="Review"
            showSeparator
            action={
                <WidgetFormAction
                    active={editEnabled}
                    handleToggle={handleToggle}
                    handleSubmit={form.handleSubmit(handleSubmit)}
                    label="Edit"
                    isPending={isPending}
                />
            }>
            <div className="flex-1 font-extralight bg-neutral-900 p-4 rounded-md">
                <Form {...form}>
                    <form className="bg-primary-foreground flex flex-col p-4 rounded-md space-y-3">
                        <FormField
                            control={form.control}
                            name="appointmentStatus"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Thing 1</FormLabel>
                                    <FormControl>
                                        Thing1
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <p>Accepted and Rejected buttons</p>
                        <p>Requires Consultation Checkbox</p>
                        <p>No of Sessions Required Input box</p>
                    </form>
                </Form>
            </div>
        </WidgetWrapper>
    );
};
