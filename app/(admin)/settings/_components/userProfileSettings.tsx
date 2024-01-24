"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowUpNarrowWide, Clock, LockKeyhole, Tag, Tags, User } from "lucide-react";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { setContactSettings } from "@/actions/contacts";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { WidgetWrapper } from "@/components/widgetWrapper";
import { userSettingsSchema } from "@/schemas";

type Props = {
    settings: z.infer<typeof userSettingsSchema>;
};
export const UserProfileSettings = ({ settings }: Props) => {
    const {
        bookmarkSortOption,
        bookmarkSortDir,
        contactSortOption,
        contactSortDir,
        showBirthday,
    } = settings;
    const [isPending, startTransition] = useTransition();
    const form = useForm<z.infer<typeof userSettingsSchema>>({
        resolver: zodResolver(userSettingsSchema),
        defaultValues: {
            bookmarkSortOption,
            bookmarkSortDir,
            contactSortOption,
            contactSortDir,
            showBirthday,
        },
    });

    const onSubmit = (values: z.infer<typeof userSettingsSchema>) => {
        startTransition(() => {
            setContactSettings(values)
                .then(() => {
                    toast.success('Changes saved.')
                })
                .catch(() =>
                    toast.error("Something went wrong updating user settings.")
                );
        });
    };
    return (
        <Form {...form}>
            <form
                className="flex flex-col gap-y-5"
                onSubmit={form.handleSubmit(onSubmit)}>
                <WidgetWrapper title="Personal Settings" showSeparator>
                    <p>First Name</p>
                    <p>Last Name</p>
                    <p>Username</p>
                    <p>Email</p>
                    <p>Phone Number</p>
                    <p>Image Url</p>
                    <p>User Bio</p>
                    <p>Preferred Pronouns</p>
                    <FormField
                        control={form.control}
                        name="showBirthday"
                        render={({ field }) => (
                            <FormItem className="flex gap-x-3 items-center">
                                <FormLabel>Show Birthday</FormLabel>
                                <FormControl>
                                    <Switch
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </WidgetWrapper>

                <WidgetWrapper title="Preferred Bookmark Sorting" showSeparator>
                    <div className="flex flex-col md:flex-row gap-y-5 md:gap-x-5">
                        <FormField
                            control={form.control}
                            name="bookmarkSortOption"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-normal text-lg">
                                        Sort By:{" "}
                                    </FormLabel>
                                    <FormControl className="mt-3">
                                        <RadioGroup
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}>
                                            <FormItem className="flex items-center gap-x-3">
                                                <FormControl>
                                                    <RadioGroupItem value="label" />
                                                </FormControl>
                                                <FormLabel className="flex-1 flex items-center gap-x-3">
                                                    <p className="flex-1 font-light">Label</p>
                                                    <Tag className="w-5- h-5" />
                                                </FormLabel>
                                            </FormItem>

                                            <FormItem className="flex items-center gap-x-3">
                                                <FormControl>
                                                    <RadioGroupItem value="status" />
                                                </FormControl>
                                                <FormLabel className="flex-1 flex items-center gap-x-3">
                                                    <p className="flex-1 font-light">Status</p>
                                                    <Tags className="w-5- h-5" />
                                                </FormLabel>
                                            </FormItem>

                                            <FormItem className="flex items-center gap-x-3">
                                                <FormControl>
                                                    <RadioGroupItem value="created_at" />
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
                                <FormItem>
                                    <FormLabel className="font-normal text-lg">
                                        Direction:{" "}
                                    </FormLabel>

                                    <FormControl className="mt-3">
                                        <RadioGroup
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}>
                                            <FormItem className="flex items-center gap-x-3">
                                                <FormControl>
                                                    <RadioGroupItem value="asc" />
                                                </FormControl>
                                                <FormLabel className="flex-1 flex items-center gap-x-3">
                                                    <p className="flex-1 font-light">Ascending</p>
                                                    <ArrowUpNarrowWide className="w-5- h-5" />
                                                </FormLabel>
                                            </FormItem>

                                            <FormItem className="flex items-center gap-x-3">
                                                <FormControl>
                                                    <RadioGroupItem value="desc" />
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

                <WidgetWrapper title="Preferred Contact Sorting" showSeparator>
                    <div className="flex flex-col md:flex-row gap-y-5 md:gap-x-5">
                        <FormField
                            control={form.control}
                            name="contactSortOption"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-normal text-lg">
                                        Sort By:{" "}
                                    </FormLabel>
                                    <FormControl className="mt-3">
                                        <RadioGroup
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}>
                                            <FormItem className="flex items-center gap-x-3">
                                                <FormControl>
                                                    <RadioGroupItem value="first_name" />
                                                </FormControl>
                                                <FormLabel className="flex-1 flex items-center gap-x-3">
                                                    <p className="flex-1 font-light">First Name</p>
                                                </FormLabel>
                                            </FormItem>

                                            <FormItem className="flex items-center gap-x-3">
                                                <FormControl>
                                                    <RadioGroupItem value="last_name" />
                                                </FormControl>
                                                <FormLabel className="flex-1 flex items-center gap-x-3">
                                                    <p className="flex-1 font-light">Last Name</p>
                                                </FormLabel>
                                            </FormItem>

                                            <FormItem className="flex items-center gap-x-3">
                                                <FormControl>
                                                    <RadioGroupItem value="username" />
                                                </FormControl>
                                                <FormLabel className="flex-1 flex items-center gap-x-3">
                                                    <p className="flex-1 font-light">Username</p>
                                                    <User className="w-5- h-5" />
                                                </FormLabel>
                                            </FormItem>

                                            <FormItem className="flex items-center gap-x-3">
                                                <FormControl>
                                                    <RadioGroupItem value="role" />
                                                </FormControl>
                                                <FormLabel className="flex-1 flex items-center gap-x-3">
                                                    <p className="flex-1 font-light">Role</p>
                                                    <LockKeyhole className="w-5- h-5" />
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
                                <FormItem>
                                    <FormLabel className="font-normal text-lg">
                                        Direction:{" "}
                                    </FormLabel>

                                    <FormControl className="mt-3">
                                        <RadioGroup
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}>
                                            <FormItem className="flex items-center gap-x-3">
                                                <FormControl>
                                                    <RadioGroupItem value="asc" />
                                                </FormControl>
                                                <FormLabel className="flex-1 flex items-center gap-x-3">
                                                    <p className="flex-1 font-light">Ascending</p>
                                                    <ArrowUpNarrowWide className="w-5- h-5" />
                                                </FormLabel>
                                            </FormItem>

                                            <FormItem className="flex items-center gap-x-3">
                                                <FormControl>
                                                    <RadioGroupItem value="desc" />
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

                <Button disabled={isPending} size="sm" variant="primary" type="submit">
                    Save Changes
                </Button>
            </form>
        </Form>
    );
};

export const UserProfileSettingsSkeleton = () => {
    return (
        <div className="flex flex-col gap-y-5">
            {
                [...new Array(3)].map((_, i) => (
                    <div className="space-y-2" key={i}>
                        <Skeleton className="bg-primary-foreground w-60 h-8" />
                        <Skeleton className="bg-primary-foreground w-20 h-8" />
                    </div>
                ))
            }
        </div>
    )
}