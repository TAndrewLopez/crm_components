import type { Metadata } from "next";

import { getSubmissions } from "@/actions/submissions";
import { PageWrapper } from "@/components/pageWrapper";
import { TableWrapper } from "@/components/table/tableWrapper";
import { columns } from "./_components/columns";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export const metadata: Metadata = {
    title: "Submissions",
}

type Props = {}

const SubmissionPage = async ({ }: Props) => {
    const submissionData = await getSubmissions()

    // if (!submissionData) return <div>Loading?</div>
    return (
        <PageWrapper className="flex flex-col gap-y-5 font-extralight p-4">
            <TableWrapper columns={columns} data={submissionData} />
        </PageWrapper>
    );
};

export default SubmissionPage;
