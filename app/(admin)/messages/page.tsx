import type { Metadata } from "next";

import { PageWrapper } from "@/components/pageWrapper";

export const metadata: Metadata = {
    title: "Messages",
};
const MessagePage = () => {
    return (
        <PageWrapper>
            <h1 className="text-4xl font-semibold">Messages</h1>
            Something will be here. Promise.
        </PageWrapper>
    );
};

export default MessagePage;
