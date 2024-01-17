import { db } from "@/lib/prisma";
import { columns } from "./_components/columns";
import { TableWrapper } from "./_components/tableWrapper";

const SubmissionsPage = async () => {
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
    return <TableWrapper columns={columns} data={data} />;
};

export default SubmissionsPage;
