import { Sidebar } from "@/components/sidebar"

type Props = {
    children: React.ReactNode
}

const DashboardLayout = ({ children }: Props) => {
    return (
        <div className="flex h-full">
            <Sidebar />
            {children}
        </div>
    )
}

export default DashboardLayout