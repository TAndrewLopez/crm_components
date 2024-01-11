import { DashboardWidget } from "./dashboardWidget"

export const WidgetList = () => {
    return (
        <div className="grid gird-cols-1 md:grid-cols-2 xl:grid-cols-4 w-full gap-3">
            <DashboardWidget
                title="Total Revenue"
                titleIcon="$"
                description="+20.1% from last month">
                <div className="text-2xl font-semibold tracking-wide">$45,231.89</div>
            </DashboardWidget>
            <DashboardWidget
                title="Subscriptions"
                titleIcon="💳"
                description="+180.1% from last month">
                <div className="text-2xl font-semibold tracking-wide">+2350</div>
            </DashboardWidget>
            <DashboardWidget
                title="Sales"
                titleIcon="💸"
                description="+19% from last month">
                <div className="text-2xl font-semibold tracking-wide">+12,234</div>
            </DashboardWidget>
            <DashboardWidget
                title="Active Now"
                titleIcon="📊"
                description="+201 since last hour">
                <div className="text-2xl font-semibold tracking-wide">+573</div>
            </DashboardWidget>
        </div>

    )
}