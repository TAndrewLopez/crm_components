"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { submission } from "@prisma/client";
import { CalendarIcon } from "lucide-react";
import moment from "moment";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { WidgetWrapper } from "@/components/widgetWrapper";
import { cn } from "@/lib/utils";
import { submissionAppointmentSchema } from "@/schemas";
import { WidgetFormAction } from "./widgetFormAction";

type Props = {
    submission: submission;
};

export const AppointmentWidget = ({ submission }: Props) => {
    const appointmentAccepted = submission.appointment_status;
    const [editEnabled, setEditEnabled] = useState(false);
    const [isPending, startTransition] = useTransition();
    const form = useForm<z.infer<typeof submissionAppointmentSchema>>({
        resolver: zodResolver(submissionAppointmentSchema),
        defaultValues: {},
    });

    const handleSubmit = (values: z.infer<typeof submissionAppointmentSchema>) => {
        const validatedFields = submissionAppointmentSchema.safeParse(values);
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
            title="Appointment Data"
            showSeparator
            action={
                appointmentAccepted && (
                    <WidgetFormAction
                        active={editEnabled}
                        handleToggle={handleToggle}
                        handleSubmit={form.handleSubmit(handleSubmit)}
                        label="Edit"
                        isPending={isPending}
                    />
                )
            }>
            <div className="flex-1 font-extralight bg-neutral-900 rounded-md">
                {appointmentAccepted && (
                    <Form {...form}>
                        <form className="bg-primary-foreground flex flex-col p-4 rounded-md space-y-3">
                            <FormField
                                control={form.control}
                                name="consultationDate"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>Consultation Date</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        disabled={!editEnabled}
                                                        className={cn(
                                                            "min-w-[240px] pl-3 mt-3 text-left font-normal",
                                                            !field.value && "text-muted-foreground"
                                                        )}
                                                        variant="outline">
                                                        {field.value ? (
                                                            moment().format("MM/DD/yyyy")
                                                        ) : (
                                                            <span>Pick a date</span>
                                                        )}
                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    disabled={(date) =>
                                                        date > new Date() || date < new Date("1900-01-01")
                                                    }
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="depositPaid"
                                render={({ field }) => (
                                    <FormItem className="flex items-center gap-x-3">
                                        <FormLabel>Deposit Paid</FormLabel>
                                        <FormControl>
                                            <Checkbox
                                                disabled
                                                className="disabled:cursor-auto"
                                                checked={true}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </form>
                    </Form>
                )}

                {!appointmentAccepted && (
                    <div className="flex-1 h-full flex items-center justify-center p-4">{`Appointment hasn't been accepted.`}</div>
                )}
            </div>
        </WidgetWrapper>
    );
};
