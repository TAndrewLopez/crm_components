import type { Metadata } from "next";

import { PageWrapper } from "@/components/pageWrapper";

export const metadata: Metadata = {
    title: "Calendar",
}

const CalendarPage = () => {
    return (
        <PageWrapper>
            <h1 className="text-4xl font-semibold">Calendar</h1>

            Something will be here. Promise.

        </PageWrapper>
    );
};
export default CalendarPage;
