"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState, useTransition } from "react";

import { WidgetWrapper } from "@/components/widgetWrapper";
import { reviewAppointmentSchema } from "@/schemas";
import { WidgetFormAction } from "./widgetFormAction";
import { Form } from "@/components/ui/form";

export const ReviewWidget = () => {
    const [editEnabled, setEditEnabled] = useState(false);
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof reviewAppointmentSchema>>({
        resolver: zodResolver(reviewAppointmentSchema),
        defaultValues: {
            // consultationDate,
            // depositPaid,
            // otherReason,
            // referenceImageURL,
            // referral,
            // rejectionReason,
        },
    });

    const handleSubmit = (value: z.infer<typeof reviewAppointmentSchema>) => { };
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
                    label='Edit'
                    isPending={isPending}
                />
            }>
            <div className="flex-1 font-extralight bg-neutral-900 p-4 rounded-md">
                <Form {...form}>
                    <form className="bg-primary-foreground flex flex-col p-4 rounded-md space-y-3">
                        <p>Accepted and Rejected buttons</p>
                        <p>Requires Consultation Checkbox</p>
                        <p>No of Sessions Required Input box</p>
                    </form>
                </Form>
            </div>
        </WidgetWrapper>
    );
};
