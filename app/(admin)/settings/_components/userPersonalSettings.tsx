"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { Form, useForm } from "react-hook-form";
import * as z from "zod";

import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { WidgetFormAction } from "@/components/widgetFormAction";
import { WidgetWrapper } from "@/components/widgetWrapper";
import { userPersonalSettingsSchema } from "@/schemas";

type Props = {};

export const UserPersonalSettings = ({ }: Props) => {
    const [editEnabled, setEditEnabled] = useState(false);
    const [isPending, startTransition] = useTransition();
    const form = useForm<z.infer<typeof userPersonalSettingsSchema>>({
        resolver: zodResolver(userPersonalSettingsSchema),
        defaultValues: {},
    });

    const handleSubmit = (values: z.infer<typeof userPersonalSettingsSchema>) => {
        // startTransition(() => { });
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
                    >
                     fdasf
                    </WidgetWrapper>

                </div>
            </form>
        </Form>
    );
};
