import { db } from "@/lib/prisma";
import { columns } from "./_components/columns";
import { TableWrapper } from "./_components/tableWrapper";

const SubmissionsPage = async () => {
    const data = await db.submission.findMany({})

    return (
        <div className="overflow-hidden h-full overflow-y-auto px-6">
            <TableWrapper columns={columns} data={data} />
        </div>
    );
};

export default SubmissionsPage;
