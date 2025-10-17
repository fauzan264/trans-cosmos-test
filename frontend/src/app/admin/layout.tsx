"use client";
import Sidebar from "@/components/ui/Sidebar";
import AuthGuard from "@/hoc/AuthGuard";

interface AppLayoutProps {
  children: React.ReactNode;
}

function AppLayout({ children }: AppLayoutProps) {
  return <Sidebar>{children}</Sidebar>;
}

export default AuthGuard(AppLayout, ["admin", "user"]);
