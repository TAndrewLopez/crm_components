import { Sidebar, SidebarSkeleton } from "@/components/sidebar";
import { Suspense } from "react";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

type Props = {
    children: React.ReactNode;
};

const AdminViewLayout = ({ children }: Props) => {
    return (
        <div className="flex h-full w-full">
            <Sidebar />
            <div className="w-full h-full overflow-y-auto">{children}</div>
        </div>
    );
};

export default AdminViewLayout;
