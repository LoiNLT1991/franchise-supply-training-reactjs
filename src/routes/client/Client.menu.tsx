import type { JSX } from "react";
import { ROUTER_URL } from "../router.const";
import React from "react";

export type ClientMenuItem = {
  label: string;
  path: string;
  component: React.LazyExoticComponent<() => JSX.Element>;
  isEnd?: boolean;
};

export const CLIENT_MENU: ClientMenuItem[] = [
  {
    label: "Profile",
    path: ROUTER_URL.CLIENT_ROUTER.PROFILE,
    component: React.lazy(() => import("@/pages/client/profile/ClientProfile.page")),
    isEnd: true,
  },
  {
    label: "Cart",
    path: ROUTER_URL.CLIENT_ROUTER.CART,
    component: React.lazy(() => import("@/pages/client/cart/Cart.page")),
    isEnd: true,
  },
  {
    label: "Payment",
    path: ROUTER_URL.CLIENT_ROUTER.PAYMENT,
    component: React.lazy(() => import("@/pages/client/payment/Payment.page")),
    isEnd: true,
  },
];
