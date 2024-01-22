import { Sidebar } from "@/components/sidebar";

type Props = {
    children: React.ReactNode
}

const AdminViewLayout = ({ children }: Props) => {
    return (
        <div className="flex h-full w-full">
            <Sidebar />
            <div className="w-full h-full overflow-y-auto">
                {children}
            </div>
        </div>
    )
}

export default AdminViewLayout
