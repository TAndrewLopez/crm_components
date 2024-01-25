"use client";

import * as z from "zod";
import { submission } from "@prisma/client";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit, Edit2, Edit3 } from "lucide-react";

import { WidgetWrapper } from "@/components/widgetWrapper";
import { initialDataSchema } from "@/schemas";
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
import { useState } from "react";

type Props = {
    submission: submission;
};

export const InitialWidget = ({
    submission: { color, description, placement, size },
}: Props) => {
    const [editEnabled, setEditEnabled] = useState(true);
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
    };

    const handleCancel = () => {
        setEditEnabled(false);
    };

    return (
        <WidgetWrapper
            action={<EditAction active={editEnabled} />}
            className="flex-1"
            title="Initial Information"
            showSeparator>
            <div className="font-extralight rounded-md ">
                <Form {...form}>
                    <form
                        className="bg-primary-foreground flex flex-col p-4 rounded-md space-y-3"
                        onSubmit={form.handleSubmit(handleSubmit)}>
                        <FormField
                            control={form.control}
                            name="color"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-lg">Tattoo Color</FormLabel>
                                    <Select
                                        disabled={!editEnabled}
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger className="disabled:cursor-auto">
                                                <SelectValue placeholder="Select color" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="color">Color</SelectItem>
                                            <SelectItem value="black and grey">
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
                                        defaultValue={field.value}>
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

const EditAction = ({ active }: { active: boolean }) => {
    return (
        <button className="group flex items-center gap-x-3 justify-end hover:bg-emerald-500 transition-all rounded-md py-1 px-3">
            <p className="font-semibold">{active ? "Cancel" : "Edit"}</p>
            <Edit className="w-4 h-4" />
        </button>
    );
};
