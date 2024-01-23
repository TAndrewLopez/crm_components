"use client";

import { Tag, Tags, Clock, ArrowUpNarrowWide, User, LockKeyhole } from "lucide-react";
import { startTransition, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form";
import { ProfileSettings } from "@/lib/types";
import { userSettingsSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateUserSettings } from "@/actions/contacts";
import { WidgetWrapper } from "@/components/widgetWrapper";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type Props = {
    settings: ProfileSettings;
};
export const UserProfileSettings = ({ settings }: Props) => {
    const {
        bookmarkSortOption,
        bookmarkSortDir,
        contactSortOption,
        contactSortDir,
        showBirthday,
    } = settings;
    const [] = useTransition();
    const form = useForm<z.infer<typeof userSettingsSchema>>({
        resolver: zodResolver(userSettingsSchema),
        defaultValues: {
            bookmarkSortOption,
            bookmarkSortDir,
            contactSortOption,
            contactSortDir,
            showBirthday: showBirthday === "true" ? true : false,
        },
    });

    const onSubmit = (values: z.infer<typeof userSettingsSchema>) => {
        startTransition(() => {
            updateUserSettings(values)
                .then((data) => {
                    form.reset();
                    // ADDITIONAL SIDE EFFECTS
                })
                .catch(() =>
                    console.error("Something went wrong updating user settings.")
                );
        });
    };
    return (
        <Form {...form}>
            <form
                className="flex flex-col gap-y-5"
                onSubmit={form.handleSubmit(onSubmit)}>
                <WidgetWrapper title="Personal Settings" showSeparator>
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
                                    <FormControl>
                                        <RadioGroup
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}>
                                            <FormItem className="flex items-center gap-x-3">
                                                <FormControl>
                                                    <RadioGroupItem value="label" />
                                                </FormControl>
                                                <FormLabel className="flex-1 flex items-center gap-x-3">
                                                    <p className="flex-1">Label</p>
                                                    <Tag className="w-5- h-5" />
                                                </FormLabel>
                                            </FormItem>

                                            <FormItem className="flex items-center gap-x-3">
                                                <FormControl>
                                                    <RadioGroupItem value="status" />
                                                </FormControl>
                                                <FormLabel className="flex-1 flex items-center gap-x-3">
                                                    <p className="flex-1">Status</p>
                                                    <Tags className="w-5- h-5" />
                                                </FormLabel>
                                            </FormItem>

                                            <FormItem className="flex items-center gap-x-3">
                                                <FormControl>
                                                    <RadioGroupItem value="created_at" />
                                                </FormControl>
                                                <FormLabel className="flex-1 flex items-center gap-x-3">
                                                    <p className="flex-1">Created At</p>
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

                                    <FormControl>
                                        <RadioGroup
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}>
                                            <FormItem className="flex items-center gap-x-3">
                                                <FormControl>
                                                    <RadioGroupItem value="asc" />
                                                </FormControl>
                                                <FormLabel className="flex-1 flex items-center gap-x-3">
                                                    <p className="w-full flex-1">Ascending</p>
                                                    <ArrowUpNarrowWide className="w-5- h-5" />
                                                </FormLabel>
                                            </FormItem>

                                            <FormItem className="flex items-center gap-x-3">
                                                <FormControl>
                                                    <RadioGroupItem value="desc" />
                                                </FormControl>
                                                <FormLabel className="flex-1 flex items-center gap-x-3">
                                                    <p className="flex-1">Descending</p>
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
                                    <FormControl>
                                        <RadioGroup
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}>
                                            <FormItem className="flex items-center gap-x-3">
                                                <FormControl>
                                                    <RadioGroupItem value="first_name" />
                                                </FormControl>
                                                <FormLabel className="flex-1 flex items-center gap-x-3">
                                                    <p className="w-full flex-1">First Name</p>
                                                </FormLabel>
                                            </FormItem>

                                            <FormItem className="flex items-center gap-x-3">
                                                <FormControl>
                                                    <RadioGroupItem value="last_name" />
                                                </FormControl>
                                                <FormLabel className="flex-1 flex items-center gap-x-3">
                                                    <p className="w-full flex-1">Last Name</p>
                                                </FormLabel>
                                            </FormItem>

                                            <FormItem className="flex items-center gap-x-3">
                                                <FormControl>
                                                    <RadioGroupItem value="username" />
                                                </FormControl>
                                                <FormLabel className="flex-1 flex items-center gap-x-3">
                                                    <p className="w-full flex-1">Username</p>
                                                    <User className="w-5- h-5" />
                                                </FormLabel>
                                            </FormItem>

                                            <FormItem className="flex items-center gap-x-3">
                                                <FormControl>
                                                    <RadioGroupItem value="role" />
                                                </FormControl>
                                                <FormLabel className="flex-1 flex items-center gap-x-3">
                                                    <p className="w-full flex-1">Role</p>
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

                                    <FormControl>
                                        <RadioGroup
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}>
                                            <FormItem className="flex items-center gap-x-3">
                                                <FormControl>
                                                    <RadioGroupItem value="asc" />
                                                </FormControl>
                                                <FormLabel className="flex-1 flex items-center gap-x-3">
                                                    <p className="w-full flex-1">Ascending</p>
                                                    <ArrowUpNarrowWide className="w-5- h-5" />
                                                </FormLabel>
                                            </FormItem>

                                            <FormItem className="flex items-center gap-x-3">
                                                <FormControl>
                                                    <RadioGroupItem value="desc" />
                                                </FormControl>
                                                <FormLabel className="flex-1 flex items-center gap-x-3">
                                                    <p className="flex-1">Descending</p>
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

                <Button size="sm" variant="primary" type="submit">
                    Save Changes
                </Button>
            </form>
        </Form>
    );
};
