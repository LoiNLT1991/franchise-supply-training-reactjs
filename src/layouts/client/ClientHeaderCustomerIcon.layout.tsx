import { customerLogoutUseCase } from "@/features";
import { ROUTER_URL } from "@/routes/router.const";
import { useCustomerAuthStore, useLoadingStore } from "@/stores";
import { showFormatErrors, showSuccess } from "@/utils";
import { LogIn, LogOut, Package, User, UserPlus } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function UserMenu() {
  const customer = useCustomerAuthStore((s) => s.customer);
  const { setLoading } = useLoadingStore();

  const onLogout = async () => {
    setLoading(true);
    try {
      await customerLogoutUseCase();
      showSuccess("Logout successful!");
    } catch (error) {
      showFormatErrors(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative group">
      {/* User icon */}
      <div className="flex items-center justify-center rounded-full bg-white/10 p-2 cursor-pointer transition hover:bg-white/20">
        <User size={20} />
      </div>

      {/* Dropdown */}
      <div className="absolute right-0 mt-3 w-48 rounded-xl bg-white text-gray-800 shadow-lg opacity-0 invisible translate-y-2 transition-all duration-200 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0">
        {!customer ? (
          <>
            <NavLink
              to={ROUTER_URL.CLIENT_ROUTER.LOGIN}
              className="flex items-center gap-2 px-4 py-3 hover:bg-red-50 hover:text-red-600 rounded-t-xl"
            >
              <LogIn size={16} />
              Login
            </NavLink>

            <NavLink
              to={ROUTER_URL.CLIENT_ROUTER.REGISTER}
              className="flex items-center gap-2 px-4 py-3 hover:bg-red-50 hover:text-red-600 rounded-b-xl"
            >
              <UserPlus size={16} />
              Register
            </NavLink>
          </>
        ) : (
          <>
            <div className="border-b px-4 py-3 text-sm font-semibold">{customer.name}</div>

            <NavLink
              to={ROUTER_URL.CLIENT_ROUTER.PROFILE}
              className="flex items-center gap-2 px-4 py-3 hover:bg-red-50 hover:text-red-600"
            >
              <User size={16} />
              Profile
            </NavLink>

            <NavLink
              to={ROUTER_URL.CLIENT_ROUTER.ORDER}
              className="flex items-center gap-2 px-4 py-3 hover:bg-red-50 hover:text-red-600"
            >
              <Package size={16} />
              Orders
            </NavLink>

            <button
              onClick={onLogout}
              className="flex w-full items-center gap-2 px-4 py-3 hover:bg-red-50 hover:text-red-600 rounded-b-xl"
            >
              <LogOut size={16} />
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
}
