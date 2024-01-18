import { PageWrapper } from "@/components/pageWrapper";
import { type Metadata } from "next";

export const metadata: Metadata = {
    title: "Messages",
}
const MessagePage = () => {
    return <PageWrapper>Messages Page</PageWrapper>;
};

export default MessagePage;
