"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");

  // Admin routes → không có Header/Footer
  if (isAdminRoute) {
    return <>{children}</>;
  }

  // Customer routes → có Header/Footer
  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto px-6 py-6">{children}</main>
      <Footer />
    </>
  );
}
