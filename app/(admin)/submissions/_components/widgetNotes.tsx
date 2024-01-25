"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { submissionNote } from "@prisma/client";
import moment from "moment";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { WidgetWrapper } from "@/components/widgetWrapper";
import { newNoteSchema } from "@/schemas";
import { WidgetFormAction } from "./widgetFormAction";

type Props = {
    notes: submissionNote[];
};

export const NotesWidget = ({ notes }: Props) => {
    const [editEnabled, setEditEnabled] = useState(false);
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof newNoteSchema>>({
        resolver: zodResolver(newNoteSchema),
    });

    const handleSubmit = (values: z.infer<typeof newNoteSchema>) => {
        console.log("submit form", values);
        handleToggle();
    };

    const handleToggle = () => {
        editEnabled ? setEditEnabled(false) : setEditEnabled(true);
        form.reset();
    };

    return (
        <WidgetWrapper
            className="flex-1"
            title="Notes"
            showSeparator
            action={
                <WidgetFormAction
                    active={editEnabled}
                    handleToggle={handleToggle}
                    handleSubmit={form.handleSubmit(handleSubmit)}
                    label='Add'
                    isPending={isPending}
                />
            }>
            <div className="flex flex-col gap-y-2 h-64 xl:h-96 overflow-y-auto">
                <div className="space-y-3">
                    <ul className="flex flex-col gap-y-3">
                        {
                            editEnabled &&
                            <Form {...form}>
                                <form className="bg-primary-foreground flex flex-col p-4 rounded-md space-y-3">
                                    <FormField
                                        control={form.control}
                                        name="text"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-lg">New Note</FormLabel>
                                                <Textarea
                                                    placeholder="Enter a new note"
                                                    className="resize-none mt-2 disabled:cursor-auto"
                                                    {...field}
                                                />
                                                {/* <Input
                                                    className="mt-2 disabled:cursor-auto"
                                                    disabled={!editEnabled}
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                /> */}
                                            </FormItem>
                                        )}
                                    />
                                </form>
                            </Form>
                        }
                        {notes.map((note) => (
                            <li
                                className="bg-primary-foreground p-2 rounded-sm"
                                key={note.id}>
                                <p className="text-sm font-extralight">{note.text}</p>
                                <div className="flex flex-nowrap gap-x-3">
                                    <p className="text-right text-xs text-neutral-300 font-extralight">
                                        {moment(note.created_at).fromNow()}
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </WidgetWrapper>
    );
};
