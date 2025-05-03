import React, { ReactNode } from "react";
import "@/style/dashboard.scss";
import DashboardLayout from "@/components/DashboardLayout";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
export default async function layout({ children }: { children: ReactNode }) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value || null;
  if (!token) {
    return redirect("/signIn");
  }
  return (
    <>
      <DashboardLayout token={token}>{children}</DashboardLayout>
    </>
  );
}
