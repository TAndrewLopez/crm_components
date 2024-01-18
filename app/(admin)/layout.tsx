import { getUserByUsername } from "@/actions/auth";
import { getFavoriteSubmissionsByUserID } from "@/actions/favorites";
import { Sidebar } from "@/components/sidebar";

type Props = {
    children: React.ReactNode
}

const AdminViewLayout = async ({ children }: Props) => {
    return (
        <div className="flex h-full">
            <Sidebar />
            <div className="w-full h-full p-4 overflow-y-auto">
                {children}
            </div>
        </div>
    )
}

export default AdminViewLayout