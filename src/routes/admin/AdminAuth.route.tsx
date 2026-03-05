import React from "react";
import { Route } from "react-router-dom";
import { GuestAdminGuard } from "../guard/GuestGuard.route";
import { ROUTER_URL } from "../router.const";

const AdminLoginPage = React.lazy(() => import("@/pages/admin/auth/login/AdminLogin.page"));
const ForgotPasswordPage = React.lazy(() => import("@/pages/admin/auth/ForgotPassword.page"));

export const AdminAuthRoutes = (
  <>
    <Route
      path={ROUTER_URL.ADMIN_ROUTER.LOGIN}
      element={
        <GuestAdminGuard>
          <AdminLoginPage />
        </GuestAdminGuard>
      }
    />
    <Route path={ROUTER_URL.ADMIN_ROUTER.FORGOT_PASSWORD} element={<ForgotPasswordPage />} />
  </>
);
