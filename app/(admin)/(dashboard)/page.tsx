import { DashboardGraph } from "./_components/dashboardGraph";
import { DashboardWidget } from "./_components/dashboardWidget";
import { PageWrapper } from "./_components/pageWrapper";

const DashboardPage = () => {
  return (
    <PageWrapper className="flex flex-col gap-y-6">
      <h1 className="text-4xl font-semibold">Dashboard</h1>

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
