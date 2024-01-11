import { InitialSubmission } from "@/temporary/types";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";
import { submissions } from "@/temporary/data";
import { subs } from "@/temporary/util";
import { PageWrapper } from "@/app/(admin)/(dashboard)/_components/pageWrapper";

async function getData(): Promise<InitialSubmission[]> {
    return submissions;
}

const SubmissionsPage = async () => {
    const data = await getData();

    return (
        <PageWrapper>
            <DataTable columns={columns} data={data} />
        </PageWrapper>
    );
};

export default SubmissionsPage;
