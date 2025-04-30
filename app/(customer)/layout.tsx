import React from "react";

import { cookies } from "next/headers";
import LayoutWrapper from "@/components/LayoutWrapper";

export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const token = (await cookieStore).get("token")?.value || null;

  return <LayoutWrapper token={token}>{children}</LayoutWrapper>;
}
