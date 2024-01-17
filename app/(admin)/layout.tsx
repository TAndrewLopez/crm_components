import { Sidebar } from "@/components/sidebar"

type Props = {
    children: React.ReactNode
}

const AdminViewLayout = ({ children }: Props) => {
    return (
        <div className="flex h-full">
            <Sidebar />
            <div className="w-full p-4 overflow-auto">
                {children}
            </div>
        </div>
    )
}

export default AdminViewLayout