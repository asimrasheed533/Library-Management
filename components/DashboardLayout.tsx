import React, { ReactNode } from "react";
import "@/style/listing.scss";
import "@/style/dashboard.scss";
import DashboardHeader from "./DashboardHeader";
import DashboardSidebar from "./DashboardSidebar";

export interface IDashboardLayout {
  children: ReactNode;
  token: string | null;
}

export default function DashboardLayout({ children, token }: IDashboardLayout) {
  return (
    <div className="dashboard">
      <DashboardSidebar />
      <div className="dashboard__main">
        <DashboardHeader token={token} />
        <div className="dashboard__main__content">
          <div className="dashboard__main__content__inner">{children}</div>
        </div>
      </div>
    </div>
  );
}
