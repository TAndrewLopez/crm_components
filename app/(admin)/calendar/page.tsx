"use client";
import { useRef } from "react";

import { PageWrapper } from "@/components/pageWrapper";

const CalendarPage = () => {
    const div = useRef(null);
    console.log(div.current);
    return (
        <PageWrapper>
            thing
        </PageWrapper>
    );
};
export default CalendarPage;
