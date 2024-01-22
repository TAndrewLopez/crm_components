import type { Metadata } from "next";

import { PageWrapper } from "@/components/pageWrapper";

export const metadata: Metadata = {
    title: "Calendar",
}

const CalendarPage = () => {
    return (
        <PageWrapper className="flex flex-col gap-y-5 font-extralight p-4">
            <h1 className="text-4xl font-semibold">Calendar</h1>
        </PageWrapper>
    );
};
export default CalendarPage;
