"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { submission } from "@prisma/client";
import { Check, Edit, X } from "lucide-react";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { Button } from "@/components/ui/button";
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
import { initialDataSchema } from "@/schemas";
import { Hint } from "@/components/hint";

type Props = {
    submission: submission;
};

export const InitialWidget = ({
    submission: { color, description, placement, size },
}: Props) => {
    const [editEnabled, setEditEnabled] = useState(false);
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof initialDataSchema>>({
        resolver: zodResolver(initialDataSchema),
        defaultValues: {
            color,
            description,
            placement,
            size,
        },
    });

    const handleSubmit = (values: z.infer<typeof initialDataSchema>) => {
        const validatedFields = initialDataSchema.safeParse(values);
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
            action={
                <FormAction
                    active={editEnabled}
                    handleToggle={handleToggle}
                    handleSubmit={form.handleSubmit(handleSubmit)}
                    isPending={isPending}
                />
            }
            className="flex-1"
            title="Initial Information"
            showSeparator>
            <div className="font-extralight rounded-md ">
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

type FormActionProps = {
    active: boolean;
    handleToggle: () => void;
    handleSubmit: () => void;
    isPending: boolean;
};

const FormAction = ({
    active,
    handleToggle,
    handleSubmit,
    isPending,
}: FormActionProps) => {
    if (active) {
        return (
            <div className="flex gap-x-3 items-center">
                <Hint delayAmount={0} label="Submit" side="top" asChild>
                    <Button
                        onClick={handleSubmit}
                        disabled={!active || isPending}
                        className="bg-emerald-500 hover:bg-emerald-500/50 h-8 2xl:h-6"
                        variant="link"
                        type="submit">
                        <Check className="w-4 h-4" />
                    </Button>
                </Hint>

                <Hint delayAmount={0} label="Cancel" side="top" asChild>
                    <Button
                        onClick={handleToggle}
                        disabled={!active || isPending}
                        className="bg-destructive hover:bg-destructive/50 h-8 2xl:h-6"
                        variant="link"
                        type="button">
                        <X className="w-4 h-4" />
                    </Button>
                </Hint>
            </div>
        );
    }

    return (
        <Button
            onClick={handleToggle}
            className="flex gap-x-3 bg-emerald-500 hover:bg-emerald-500/50 h-8 2xl:h-6"
            variant="link"
            type="submit">
            <p>Edit</p>
            <Edit className="w-4 h-4" />
        </Button>
    );
};
