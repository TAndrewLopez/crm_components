"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState, useTransition } from "react";

import { WidgetWrapper } from "@/components/widgetWrapper";
import { initialReviewSchema } from "@/schemas";
import { WidgetFormAction } from "./widgetFormAction";
import { Form } from "@/components/ui/form";

export const AppointmentWidget = () => {
    const [editEnabled, setEditEnabled] = useState(false);
    const [isPending, startTransition] = useTransition();
    const form = useForm<z.infer<typeof initialReviewSchema>>({
        resolver: zodResolver(initialReviewSchema),
        defaultValues: {},
    });

    const handleSubmit = (value: z.infer<typeof initialReviewSchema>) => { };
    const handleToggle = () => {
        editEnabled ? setEditEnabled(false) : setEditEnabled(true);
        form.reset();
    };

    return (
        <WidgetWrapper
            className="flex-1"
            title="Appointment Data"
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
                        <p>Consultation Date - If required</p>
                        <p>Appointment Date & no of sessions required</p>
                        <p>Deposit Paid?</p>
                        <p>Reference image uploaded?</p>
                        <p>Input for reference image</p>
                    </form>
                </Form>
            </div>
        </WidgetWrapper>
    );
};
