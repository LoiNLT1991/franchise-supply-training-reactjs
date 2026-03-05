import { useAdminAuthStore } from "@/stores";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import AdminFooter from "./AdminFooter.layout";
import AdminHeader from "./AdminHeader.layout";
import AdminSidebar from "./AdminSidebar.layout";

export default function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false);

  const initializeAdminAuth = useAdminAuthStore((s) => s.initializeAdminAuth);

  useEffect(() => {
    initializeAdminAuth();
  }, [initializeAdminAuth]);

  return (
    <div className="flex h-screen bg-[#f7f7f7] text-slate-800">
      {/* Sidebar */}
      <AdminSidebar collapsed={collapsed} />

      {/* Main content */}
      <div className="flex flex-1 flex-col">
        {/* Header */}
        <AdminHeader onToggleSidebar={() => setCollapsed((v) => !v)} />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>

        {/* Footer */}
        <AdminFooter />
      </div>
    </div>
  );
}
