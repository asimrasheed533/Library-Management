"use client";

import React, { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";

const ROUTES_NO_HEADER_FOOTER: string[] = ["/signIn", "/signUp", "/dashboard"];

interface LayoutProps {
  children: ReactNode;
  token: string | null;
}

export default function LayoutWrapper({ children, token }: LayoutProps) {
  const pathname = usePathname() || "";
  const shouldShowHeaderFooter = !ROUTES_NO_HEADER_FOOTER.some((route) =>
    pathname.startsWith(route)
  );

  return (
    <div>
      {shouldShowHeaderFooter && <Header token={token} />}

      {children}
      {shouldShowHeaderFooter && <Footer />}
    </div>
  );
}
