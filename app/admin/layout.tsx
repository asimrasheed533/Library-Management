import React, { ReactNode } from "react";
import "@/style/dashboard.scss";
import DashboardLayout from "@/components/DashboardLayout";
export default function layout({ children }: { children: ReactNode }) {
  return (
    <>
      <DashboardLayout>{children}</DashboardLayout>
    </>
  );
}
