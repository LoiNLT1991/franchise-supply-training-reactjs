import { ShoppingCart } from "lucide-react";
import { NavLink } from "react-router-dom";
import UserMenu from "./ClientHeaderCustomerIcon.layout";
import { ROUTER_URL } from "@/routes/router.const";
import FranchiseSelect from "./ClientHeaderFranchise.layout";

export default function Header() {
  const navItems = [
    { name: "Menu", path: ROUTER_URL.MENU },
    { name: "About", path: ROUTER_URL.ABOUT },
    { name: "Store Location", path: ROUTER_URL.STORE },
    { name: "Contact", path: ROUTER_URL.CONTACT },
  ];

  return (
    <header className="sticky top-0 z-50 bg-red-700 text-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <div className="text-3xl font-extrabold italic tracking-wide">FOODIX</div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `hover:text-yellow-300 transition ${isActive ? "text-yellow-300 font-semibold" : ""}`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-6">
            {/* Phone */}
            <div className="hidden lg:flex flex-col text-right leading-tight">
              <FranchiseSelect />
            </div>

            {/* Cart Button */}
            <NavLink
              to={ROUTER_URL.CLIENT_ROUTER.CART}
              className="flex items-center gap-3 rounded-full bg-lime-600 px-6 py-3 text-sm font-semibold hover:bg-lime-700 transition"
            >
              <ShoppingCart size={18} />
              Go to Your Cart
            </NavLink>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <UserMenu />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
