'use client'

import { useForm } from "react-hook-form"
import * as z from 'zod'

import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { WidgetWrapper } from "@/components/widgetWrapper"
import { personalSettingSchema } from "@/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"


export const PersonalSettings = () => {
    const form = useForm<z.infer<typeof personalSettingSchema>>({
        resolver: zodResolver(personalSettingSchema),
        defaultValues: {
            showBirthday: true
        }
    });

    const onSubmit = (values: z.infer<typeof personalSettingSchema>) => {
        console.log("things", values);
    };
    return (
        <WidgetWrapper title="Personal Settings" showSeparator>
            <Form {...form}>
                <form
                    className="flex items-center justify-between"
                    onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        control={form.control}
                        name='showBirthday'
                        render={({ field }) => (
                            <FormItem className="flex gap-x-3 items-center">
                                <FormLabel>Show Birthday</FormLabel>
                                <FormControl>
                                    <Switch
                                        checked={field.value}
                                        onCheckedChange={field.onChange} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <Button className="" variant='primary' type="submit">Save</Button>
                </form>
            </Form>
        </WidgetWrapper>
    )
}