import type { Metadata } from "next";

import { PageWrapper } from "@/components/pageWrapper";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export const metadata: Metadata = {
    title: "Messages",
};

type Props = {}

const MessagePage = ({ }: Props) => {
    return (
        <PageWrapper className="flex flex-col gap-y-5 font-extralight p-4">
            <h1 className="text-4xl font-semibold">Messages</h1>
        </PageWrapper>
    );
};

export default MessagePage;
