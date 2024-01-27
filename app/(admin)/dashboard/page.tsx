import type { Metadata } from "next";

import { PageWrapper } from "@/components/pageWrapper";
import { DashboardGraph } from "./_components/dashboardGraph";
import { DashboardWidget } from "./_components/dashboardWidget";
import { getDashboardData } from "@/actions/dashboard";
import { getFullName } from "@/lib/utils";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export const metadata: Metadata = {
  title: "Dashboard",
};

type Props = {};

const DashboardPage = async ({ }: Props) => {
  const {
    clientWithMostPaidDeposit,
    clientWithMostSubmissions,
    employeeWithMostPaidDeposit,
  } = await getDashboardData();

  return (
    <PageWrapper className="flex flex-col gap-y-5 font-extralight p-4">
      <h1 className="text-4xl font-semibold">Dashboard</h1>

      <div className="flex flex-col gap-y-5 xl:gap-x-5 xl:flex-row ">
        <DashboardWidget
          className="flex-1"
          title={getFullName(
            clientWithMostPaidDeposit.first_name ?? "",
            clientWithMostPaidDeposit.last_name ?? ""
          )}
          titleIcon="$"
          description="Highest playing client.">
          <div className="text-2xl font-semibold tracking-wide flex items-end gap-x-2">
            $ {clientWithMostPaidDeposit.amountPaid?.toLocaleString()}{" "}
            <p className="text-xs pb-1">lifetime total</p>
          </div>
        </DashboardWidget>

        <DashboardWidget
          className="flex-1"
          title={getFullName(
            clientWithMostSubmissions.first_name ?? "",
            clientWithMostSubmissions.last_name ?? ""
          )}
          titleIcon="#"
          description="Client with most submission.">
          <div className="text-2xl font-semibold tracking-wide flex items-end gap-x-2">
            {clientWithMostSubmissions.totalSubmissions}
            <p className="text-xs pb-1">lifetime total</p>
          </div>
        </DashboardWidget>
        <DashboardWidget
          className="flex-1"
          title={getFullName(
            employeeWithMostPaidDeposit.first_name ?? "",
            employeeWithMostPaidDeposit.last_name ?? ""
          )}
          titleIcon="#"
          description="Employee with most earnings.">
          <div className="text-2xl font-semibold tracking-wide flex items-end gap-x-2">
            $ {employeeWithMostPaidDeposit.amountPaid?.toLocaleString()}
            <p className="text-xs pb-1">lifetime total</p>
          </div>
        </DashboardWidget>
      </div>


      <div className="flex flex-col gap-y-5 xl:gap-x-5 xl:flex-row ">
        <DashboardWidget
          className="flex-1"
          title="Total Revenue"
          titleIcon="$"
          description="+20.1% from last month">
          <div className="text-2xl font-semibold tracking-wide">$45,231.89</div>
        </DashboardWidget>

        <DashboardWidget
          className="flex-1"
          title={getFullName(
            clientWithMostSubmissions.first_name ?? "",
            clientWithMostSubmissions.last_name ?? ""
          )}
          titleIcon="#"
          description="Client with most submission.">
          <div className="text-2xl font-semibold tracking-wide flex items-end gap-x-2">
            {clientWithMostSubmissions.totalSubmissions}
            <p className="text-xs pb-1">lifetime total</p>
          </div>
        </DashboardWidget>
        <DashboardWidget
          className="flex-1"
          title={getFullName(
            employeeWithMostPaidDeposit.first_name ?? "",
            employeeWithMostPaidDeposit.last_name ?? ""
          )}
          titleIcon="#"
          description="Employee with most earnings.">
          <div className="text-2xl font-semibold tracking-wide flex items-end gap-x-2">
            $ {employeeWithMostPaidDeposit.amountPaid?.toLocaleString()}
            <p className="text-xs pb-1">lifetime total</p>
          </div>
        </DashboardWidget>
      </div>

      <DashboardWidget
        className="flex-1"
        title="Total Revenue"
        titleIcon="$"
        description="+20.1% from last month">
        <div className="text-2xl font-semibold tracking-wide">$45,231.89</div>
      </DashboardWidget>
      <div className="flex-1 flex flex-col gap-y-5 xl:gap-x-5 xl:flex-row xl:justify-between">
        <p>Total Sales for the current day.</p>
        <p>Total Sales for the last 7 days.</p>
        <p>Total Sales for the last 30 days.</p>
        <p>Total Sales for the current year.</p>
        <p>Total Sales for the last 12 months.</p>
      </div>
      <div className="flex flex-col xl:flex-row gap-4 h-full">
        <DashboardGraph />
      </div>
    </PageWrapper>
  );
};

export default DashboardPage;
