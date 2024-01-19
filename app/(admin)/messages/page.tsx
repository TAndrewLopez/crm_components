import type { Metadata } from "next";

import { PageWrapper } from "@/components/pageWrapper";

export const metadata: Metadata = {
    title: "Messages",
}
const MessagePage = () => {
    return <PageWrapper>Messages Page</PageWrapper>;
};

export default MessagePage;
