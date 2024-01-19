import type { Metadata } from "next";

import { PageWrapper } from "@/components/pageWrapper";
import { DashboardGraph } from "./_components/dashboardGraph";
import { DashboardWidget } from "./_components/dashboardWidget";


export const metadata: Metadata = {
  title: "Dashboard",
}

const DashboardPage = () => {
  return (
    <PageWrapper className="flex flex-col gap-y-6">
      <h1 className="text-4xl font-semibold">Dashboard</h1>
      <p>Total Sales for the current day.</p>
      <p>Total Sales for the last 7 days.</p>
      <p>Total Sales for the last 30 days.</p>
      <p>Total Sales for the current year.</p>
      <p>Total Sales for the last 12 months.</p>
      <p>Current Sales Leader. Who and how much?</p>
      <p>Top employee in sales. Who and how much?</p>

      <DashboardWidget
        title="Total Revenue"
        titleIcon="$"
        description="+20.1% from last month">
        <div className="text-2xl font-semibold tracking-wide">$45,231.89</div>
      </DashboardWidget>

      <div className="flex flex-col xl:flex-row gap-4 h-full">
        <DashboardGraph />
      </div>

    </PageWrapper>
  );
};

export default DashboardPage;
