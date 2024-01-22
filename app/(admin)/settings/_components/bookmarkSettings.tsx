"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { WidgetWrapper } from "@/components/widgetWrapper";
import { bookmarkSortingSchema } from "@/schemas";

export const BookmarkSettings = () => {
  const form = useForm<z.infer<typeof bookmarkSortingSchema>>({
    resolver: zodResolver(bookmarkSortingSchema),
    defaultValues: {
      direction: "desc",
      sort_by: 'created_at',
    }
  });

  const onSubmit = (values: z.infer<typeof bookmarkSortingSchema>) => {
    console.log("things", values);
  };

  return (
    <WidgetWrapper title="Preferred Bookmark Sorting" showSeparator>
      <Form {...form}>
        <form
          className="flex"
          onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="sort_by"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sort By: </FormLabel>

                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}>
                    <FormItem>
                      <FormControl>
                        <RadioGroupItem value="label" />
                      </FormControl>
                      <FormLabel>Label</FormLabel>
                    </FormItem>
                    <FormItem>
                      <FormControl>
                        <RadioGroupItem value="status" />
                      </FormControl>
                      <FormLabel>Status</FormLabel>
                    </FormItem>
                    <FormItem>
                      <FormControl>
                        <RadioGroupItem value="created_at" />
                      </FormControl>
                      <FormLabel>Created At</FormLabel>
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
