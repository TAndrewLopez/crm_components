import type { Metadata } from "next";

import { PageWrapper } from "@/components/pageWrapper"

export const metadata: Metadata = {
    title: "Support",
};

const SupportPage = () => {
    return (
        <PageWrapper className="flex flex-col gap-y-5 font-extralight p-4">
            <h1 className="text-4xl font-semibold">Support</h1>
            Contact Dev?
            Submit Bug?
        </PageWrapper>
    )
}

export default SupportPage