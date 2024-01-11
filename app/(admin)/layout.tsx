import { Sidebar } from "@/components/sidebar"
import { Metadata } from "next"

type Props = {
    children: React.ReactNode
}

export const metadata: Metadata = {
    title: "Dashboard"
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