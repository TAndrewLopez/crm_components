"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { contactSortingSchema } from "@/schemas";
import { WidgetWrapper } from "@/components/widgetWrapper";

export const ContactSettings = () => {
    const form = useForm<z.infer<typeof contactSortingSchema>>({
        resolver: zodResolver(contactSortingSchema),
        defaultValues: {
            direction: "desc",
            sort_by: "last_name",
        },
    });

    const onSubmit = (values: z.infer<typeof contactSortingSchema>) => {
        console.log("things", values);
    };

    return (
        <WidgetWrapper
            title="Preferred Contact Sorting"
            showSeparator>
            <Form {...form}>
                <form
                    className="flex gap-x-3"
                    onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        control={form.control}
                        name='sort_by'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Sort By:</FormLabel>
                                <FormControl>
                                    <RadioGroup
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormItem>
                                            <FormControl>
                                                <RadioGroupItem value="first_name" />
                                            </FormControl>
                                            <FormLabel>First Name</FormLabel>
                                        </FormItem>
                                        <FormItem>
                                            <FormControl>
                                                <RadioGroupItem value="last_name" />
                                            </FormControl>
                                            <FormLabel>Last Name</FormLabel>
                                        </FormItem>
                                        <FormItem>
                                            <FormControl>
                                                <RadioGroupItem value="username" />
                                            </FormControl>
                                            <FormLabel>Username</FormLabel>
                                        </FormItem>
                                        <FormItem>
                                            <FormControl>
                                                <RadioGroupItem value="role" />
                                            </FormControl>
                                            <FormLabel>Role</FormLabel>
                                        </FormItem>
                                    </RadioGroup>
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="direction"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Direction: </FormLabel>
                                <FormControl>
                                    <RadioGroup
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}>
                                        <FormItem>
                                            <FormControl>
                                                <RadioGroupItem value="asc" />
                                            </FormControl>
                                            <FormLabel>Ascending</FormLabel>
                                        </FormItem>
                                        <FormItem>
                                            <FormControl>
                                                <RadioGroupItem value="desc" />
                                            </FormControl>
                                            <FormLabel>Descending</FormLabel>
                                        </FormItem>
                                    </RadioGroup>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <Button className="" variant='primary' type="submit">Save</Button>
                </form>
            </Form>
        </WidgetWrapper>
    );
};
