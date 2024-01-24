import { Sidebar, SidebarSkeleton } from "@/components/sidebar";
import { Suspense } from "react";

type Props = {
    children: React.ReactNode;
};

const AdminViewLayout = ({ children }: Props) => {
    return (
        <div className="flex h-full w-full">
            <Suspense fallback={<SidebarSkeleton />}>
                <Sidebar />
            </Suspense>
            <div className="w-full h-full overflow-y-auto">{children}</div>
        </div>
    );
};

export default AdminViewLayout;
