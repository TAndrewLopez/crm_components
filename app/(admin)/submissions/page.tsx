import { PageWrapper } from "@/components/pageWrapper";
import { db } from "@/lib/prisma";
import { columns } from "./_components/columns";
import { TableWrapper } from "./_components/tableWrapper";

const SubmissionPage = async () => {
    const data = await db.submission.findMany({
        orderBy: [
            {
                status: "asc",
            },
            {
                id: "desc",
            },
        ],
    });

    return (
        <PageWrapper>
            <TableWrapper columns={columns} data={data} />
        </PageWrapper>
    );
};

export default SubmissionPage;
