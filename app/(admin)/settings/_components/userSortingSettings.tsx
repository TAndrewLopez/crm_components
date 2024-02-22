"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
    ArrowUpNarrowWide,
    Clock,
    LockKeyhole,
    Tag,
    Tags,
    User,
} from "lucide-react";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { setContactSettings } from "@/actions/contacts";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Skeleton } from "@/components/ui/skeleton";
import { WidgetFormAction } from "@/components/widgetFormAction";
import { WidgetWrapper } from "@/components/widgetWrapper";
import { cn } from "@/lib/utils";
import { userSortingSettingsSchema } from "@/schemas";

type Props = {
    settings: z.infer<typeof userSortingSettingsSchema>;
};
export const UserSortingSettings = ({ settings }: Props) => {
    const [editEnabled, setEditEnabled] = useState(false);
    const [isPending, startTransition] = useTransition();
    const form = useForm<z.infer<typeof userSortingSettingsSchema>>({
        resolver: zodResolver(userSortingSettingsSchema),
        defaultValues: {
            bookmarkSortOption: settings.bookmarkSortOption,
            bookmarkSortDir: settings.bookmarkSortDir,
            contactSortOption: settings.contactSortOption,
            contactSortDir: settings.contactSortDir,
        },
    });

    const handleSubmit = (values: z.infer<typeof userSortingSettingsSchema>) => {
        startTransition(() => {
            setContactSettings(values)
                .then(() => {
                    toast.success("Changes saved.");
                })
                .catch(() =>
                    toast.error("Something went wrong updating user settings.")
                )
                .finally(() => setEditEnabled(false));
        });
    };

    const handleToggle = () => {
        editEnabled ? setEditEnabled(false) : setEditEnabled(true);
        
    };

    return (
        <Form {...form}>
            <form className="flex flex-col gap-y-5">
                <div className="flex flex-col xl:flex-row gap-x-5 gap-y-5">
                    <WidgetWrapper
                        className="flex-1"
                        title="Preferred Bookmark Sorting"
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
                        <div className="flex flex-col md:flex-row gap-y-5 md:gap-x-5">
                            <FormField
                                control={form.control}
                                name="bookmarkSortOption"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel className="font-normal text-lg">
                                            Sort By:{" "}
                                        </FormLabel>
                                        <FormControl className="mt-3">
                                            <RadioGroup
                                                className="flex flex-col gap-y-2"
                                                disabled={!editEnabled}
                                                onValueChange={field.onChange}>
                                                <FormItem
                                                    className={cn(
                                                        "flex-1 flex items-center gap-x-3 p-3 rounded-md bg-primary-foreground/50",
                                                        editEnabled && "bg-primary-foreground"
                                                    )}>
                                                    <FormControl>
                                                        <RadioGroupItem
                                                            checked={field.value === "label"}
                                                            value="label"
                                                        />
                                                    </FormControl>
                                                    <FormLabel className="flex-1 flex items-center gap-x-3">
                                                        <p className="flex-1 font-light">Label</p>
                                                        <Tag className="w-5- h-5" />
                                                    </FormLabel>
                                                </FormItem>

                                                <FormItem
                                                    className={cn(
                                                        "flex-1 flex items-center gap-x-3 p-3 rounded-md bg-primary-foreground/50",
                                                        editEnabled && "bg-primary-foreground"
                                                    )}>
                                                    <FormControl>
                                                        <RadioGroupItem
                                                            checked={field.value === "status"}
                                                            value="status"
                                                        />
                                                    </FormControl>
                                                    <FormLabel className="flex-1 flex items-center gap-x-3">
                                                        <p className="flex-1 font-light">Status</p>
                                                        <Tags className="w-5- h-5" />
                                                    </FormLabel>
                                                </FormItem>

                                                <FormItem
                                                    className={cn(
                                                        "flex-1 flex items-center gap-x-3 p-3 rounded-md bg-primary-foreground/50",
                                                        editEnabled && "bg-primary-foreground"
                                                    )}>
                                                    {" "}
                                                    <FormControl>
                                                        <RadioGroupItem
                                                            checked={field.value === "created_at"}
                                                            value="created_at"
                                                        />
                                                    </FormControl>
                                                    <FormLabel className="flex-1 flex items-center gap-x-3">
                                                        <p className="flex-1 font-light">Created At</p>
                                                        <Clock className="w-5- h-5" />
                                                    </FormLabel>
                                                </FormItem>
                                            </RadioGroup>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="bookmarkSortDir"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel className="font-normal text-lg">
                                            Direction:{" "}
                                        </FormLabel>

                                        <FormControl className="mt-3">
                                            <RadioGroup
                                                className="flex flex-col gap-y-2"
                                                disabled={!editEnabled}
                                                onValueChange={field.onChange}>
                                                <FormItem
                                                    className={cn(
                                                        "flex-1 flex items-center gap-x-3 p-3 rounded-md bg-primary-foreground/50",
                                                        editEnabled && "bg-primary-foreground"
                                                    )}>
                                                    <FormControl>
                                                        <RadioGroupItem
                                                            checked={field.value === "asc"}
                                                            value="asc"
                                                        />
                                                    </FormControl>
                                                    <FormLabel className="flex-1 flex items-center gap-x-3">
                                                        <p className="flex-1 font-light">Ascending</p>
                                                        <ArrowUpNarrowWide className="w-5- h-5" />
                                                    </FormLabel>
                                                </FormItem>

                                                <FormItem
                                                    className={cn(
                                                        "flex-1 flex items-center gap-x-3 p-3 rounded-md bg-primary-foreground/50",
                                                        editEnabled && "bg-primary-foreground"
                                                    )}>
                                                    <FormControl>
                                                        <RadioGroupItem
                                                            checked={field.value === "desc"}
                                                            value="desc"
                                                        />
                                                    </FormControl>
                                                    <FormLabel className="flex-1 flex items-center gap-x-3">
                                                        <p className="flex-1 font-light">Descending</p>
                                                        <ArrowUpNarrowWide className="-scale-y-100 w-5- h-5" />
                                                    </FormLabel>
                                                </FormItem>
                                            </RadioGroup>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>
                    </WidgetWrapper>
                    <WidgetWrapper
                        className="flex-1"
                        title="Preferred Contact Sorting"
                        showSeparator>
                        <div className="flex flex-col md:flex-row gap-y-5 md:gap-x-5">
                            <FormField
                                control={form.control}
                                name="contactSortOption"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel className="font-normal text-lg">
                                            Sort By:{" "}
                                        </FormLabel>
                                        <FormControl className="mt-3">
                                            <RadioGroup
                                                className="flex flex-col gap-y-2"
                                                disabled={!editEnabled}
                                                onValueChange={field.onChange}>
                                                <FormItem
                                                    className={cn(
                                                        "flex-1 flex items-center gap-x-3 p-3 rounded-md bg-primary-foreground/50",
                                                        editEnabled && "bg-primary-foreground"
                                                    )}>
                                                    <FormControl>
                                                        <RadioGroupItem
                                                            checked={field.value === "first_name"}
                                                            value="first_name"
                                                        />
                                                    </FormControl>
                                                    <FormLabel className="flex-1 flex items-center gap-x-3">
                                                        <p className="flex-1 font-light">First Name</p>
                                                    </FormLabel>
                                                </FormItem>

                                                <FormItem
                                                    className={cn(
                                                        "flex-1 flex items-center gap-x-3 p-3 rounded-md bg-primary-foreground/50",
                                                        editEnabled && "bg-primary-foreground"
                                                    )}>
                                                    <FormControl>
                                                        <RadioGroupItem
                                                            checked={field.value === "last_name"}
                                                            value="last_name"
                                                        />
                                                    </FormControl>
                                                    <FormLabel className="flex-1 flex items-center gap-x-3">
                                                        <p className="flex-1 font-light">Last Name</p>
                                                    </FormLabel>
                                                </FormItem>

                                                <FormItem
                                                    className={cn(
                                                        "flex-1 flex items-center gap-x-3 p-3 rounded-md bg-primary-foreground/50",
                                                        editEnabled && "bg-primary-foreground"
                                                    )}>
                                                    <FormControl>
                                                        <RadioGroupItem
                                                            checked={field.value === "username"}
                                                            value="username"
                                                        />
                                                    </FormControl>
                                                    <FormLabel className="flex-1 flex items-center gap-x-3">
                                                        <p className="flex-1 font-light">Username</p>
                                                        <User className="w-5- h-5" />
                                                    </FormLabel>
                                                </FormItem>
                                            </RadioGroup>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="contactSortDir"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel className="font-normal text-lg">
                                            Direction:{" "}
                                        </FormLabel>

                                        <FormControl className="mt-3">
                                            <RadioGroup
                                                className="flex flex-col gap-y-2"
                                                disabled={!editEnabled}
                                                onValueChange={field.onChange}>
                                                <FormItem className="flex-1 flex items-center gap-x-3 p-3 rounded-md bg-primary-foreground/50">
                                                    <FormControl>
                                                        <RadioGroupItem
                                                            checked={field.value === "asc"}
                                                            value="asc"
                                                        />
                                                    </FormControl>
                                                    <FormLabel className="flex-1 flex items-center gap-x-3">
                                                        <p className="flex-1 font-light">Ascending</p>
                                                        <ArrowUpNarrowWide className="w-5- h-5" />
                                                    </FormLabel>
                                                </FormItem>

                                                <FormItem
                                                    className={cn(
                                                        "flex-1 flex items-center gap-x-3 p-3 rounded-md bg-primary-foreground/50",
                                                        editEnabled && "bg-primary-foreground"
                                                    )}>
                                                    <FormControl>
                                                        <RadioGroupItem
                                                            checked={field.value === "desc"}
                                                            value="desc"
                                                        />
                                                    </FormControl>
                                                    <FormLabel className="flex-1 flex items-center gap-x-3">
                                                        <p className="flex-1 font-light">Descending</p>
                                                        <ArrowUpNarrowWide className="-scale-y-100 w-5- h-5" />
                                                    </FormLabel>
                                                </FormItem>
                                            </RadioGroup>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>
                    </WidgetWrapper>
                </div>
            </form>
        </Form>
    );
};

export const UserProfileSettingsSkeleton = () => {
    return (
        <div className="flex flex-col gap-y-5">
            {[...new Array(3)].map((_, i) => (
                <div className="space-y-2" key={i}>
                    <Skeleton className="bg-primary-foreground w-60 h-8" />
                    <Skeleton className="bg-primary-foreground w-20 h-8" />
                </div>
            ))}
        </div>
    );
};
