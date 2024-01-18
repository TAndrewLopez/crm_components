import { type Metadata } from "next";

import { getSubmissions } from "@/actions/submissions";
import { PageWrapper } from "@/components/pageWrapper";
import { TableWrapper } from "../../../components/table/tableWrapper";
import { columns } from "./_components/columns";

export const metadata: Metadata = {
    title: "Submissions",
}

const SubmissionPage = async () => {
    const data = await getSubmissions()
    return (
        <PageWrapper>
            <TableWrapper columns={columns} data={data} />
        </PageWrapper>
    );
};

export default SubmissionPage;
