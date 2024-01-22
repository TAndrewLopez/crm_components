"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Check, X } from "lucide-react";
import { type Dispatch, type SetStateAction, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { addBookmark } from "@/actions/bookmark";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { newBookmarkSchema } from "@/schemas";

type Props = {
    className?: string;
    setShowLabel: Dispatch<SetStateAction<boolean>>;
    submission_id: number;
};

export const BookmarkForm = ({
    className,
    setShowLabel,
    submission_id,
}: Props) => {
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof newBookmarkSchema>>({
        resolver: zodResolver(newBookmarkSchema),
        defaultValues: {
            label: "",
            submission_id,
        },
    });

    const onSubmit = async (values: z.infer<typeof newBookmarkSchema>) => {
        if (!values.label) return;

        startTransition(() => {
            addBookmark(values)
                .then((data) => {
                    form.reset();
                    setShowLabel(false);
                })
                .catch(() => console.error("Something went wrong updating bookmark"));
        });
    };

    const onCancel = () => {
        form.reset();
        setShowLabel(false);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className={className}>
                <FormField
                    control={form.control}
                    name="label"
                    render={({ field }) => (
                        <FormItem className="xl:space-y-0 text-center">
                            <FormLabel className="xl:hidden">Bookmark Label</FormLabel>
                            <FormControl>
                                <Input
                                    className="w-60 bg-primary-foreground"
                                    placeholder="Enter bookmark label"
                                    {...field}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <div className="flex flex-col xl:flex-row xl:items-center gap-y-3 justify-center mt-3 xl:mt-0 gap-x-3">
                    <FormField
                        control={form.control}
                        name="label"
                        render={({ field }) => (
                            <Button
                                disabled={isPending || !field.value}
                                className="bg-emerald-500 hover:bg-emerald-500/50 h-8 xl:h-6"
                                variant="link"
                                type="submit">
                                <p className="xl:hidden pr-2">Submit</p>
                                <Check className="w-4 h-4" />
                            </Button>
                        )}
                    />

                    <Button
                        disabled={isPending}
                        onClick={onCancel}
                        className="bg-destructive hover:bg-destructive/50 h-8 xl:h-6"
                        variant="link"
                        type="button">
                        <p className="xl:hidden pr-2">Cancel</p>
                        <X className="w-4 h-4" />
                    </Button>
                </div>
            </form>
        </Form>
    );
};
