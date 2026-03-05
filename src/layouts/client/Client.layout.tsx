import { useCustomerAuthStore, useFranchiseStore } from "@/stores";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Loading from "../Loading.layout";
import ClientFooter from "./ClientFooter.layout";
import ClientHeader from "./ClientHeader.layout";

export default function ClientLayout() {
  const initializeCustomerAuth = useCustomerAuthStore((s) => s.initializeCustomerAuth);
  const initializeFranchise = useFranchiseStore((s) => s.initializeFranchise);

  const authReady = useCustomerAuthStore((s) => s.isInitialized);
  const franchiseReady = useFranchiseStore((s) => s.isInitialized);

  useEffect(() => {
    initializeCustomerAuth();
    initializeFranchise();
  }, []);

  const isReady = authReady && franchiseReady;

  if (!isReady) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-[#f7f7f7] text-slate-800 flex flex-col">
      <ClientHeader />

      <main className="flex-1 overflow-x-hidden">
        <Outlet />
      </main>

      <ClientFooter />
    </div>
  );
}
