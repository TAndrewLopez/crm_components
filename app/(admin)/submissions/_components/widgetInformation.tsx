"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { submission } from "@prisma/client";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { WidgetWrapper } from "@/components/widgetWrapper";
import { tattooInformationSchema } from "@/schemas";
import { WidgetFormAction } from "./widgetFormAction";

type Props = {
    submission: submission;
};

export const InformationWidget = ({
    submission: { color, description, placement, size },
}: Props) => {
    const [editEnabled, setEditEnabled] = useState(false);
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof tattooInformationSchema>>({
        resolver: zodResolver(tattooInformationSchema),
        defaultValues: {
            color,
            description,
            placement,
            size,
        },
    });

    const handleSubmit = (values: z.infer<typeof tattooInformationSchema>) => {
        const validatedFields = tattooInformationSchema.safeParse(values);
        if (!validatedFields.success) return toast.error("Invalid Fields");
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
            title="Tattoo Information"
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
            <div className="font-extralight rounded-md">
                <Form {...form}>
                    <form className="bg-primary-foreground flex flex-col p-4 rounded-md space-y-3">
                        <FormField
                            control={form.control}
                            name="color"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-lg">Tattoo Color</FormLabel>
                                    <Select
                                        disabled={!editEnabled}
                                        onValueChange={field.onChange}
                                        value={field.value}>
                                        <FormControl>
                                            <SelectTrigger className="disabled:cursor-auto">
                                                <SelectValue placeholder="Select color" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="color">Color</SelectItem>
                                            <SelectItem value="black_and_grey">
                                                Black and Grey
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="size"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-lg">Tattoo Size</FormLabel>
                                    <Select
                                        disabled={!editEnabled}
                                        onValueChange={field.onChange}
                                        value={field.value}>
                                        <FormControl>
                                            <SelectTrigger className="disabled:cursor-auto">
                                                <SelectValue placeholder="Select color" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="xsmall">Extra Small</SelectItem>
                                            <SelectItem value="small">Small</SelectItem>
                                            <SelectItem value="medium">Medium</SelectItem>
                                            <SelectItem value="large">Large</SelectItem>
                                            <SelectItem value="xlarge">Extra Large</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="placement"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-lg">Tattoo Placement</FormLabel>
                                    <Input
                                        className="disabled:cursor-auto"
                                        disabled={!editEnabled}
                                        value={field.value}
                                        onChange={field.onChange}
                                    />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-lg">Description</FormLabel>{" "}
                                    <Input
                                        className="disabled:cursor-auto"
                                        disabled={!editEnabled}
                                        value={field.value}
                                        onChange={field.onChange}
                                    />
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>
            </div>
        </WidgetWrapper>
    );
};
