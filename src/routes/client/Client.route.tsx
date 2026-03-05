import { ClientLayout } from "@/layouts";
import { Navigate, Route } from "react-router-dom";
import ClientGuard from "../guard/ClientGuard.route";
import { ROUTER_URL } from "../router.const";
import { CLIENT_MENU } from "./Client.menu";

export const ClientRoutes = (
  <Route element={<ClientLayout />}>
    <Route element={<ClientGuard />}>
      <Route path={ROUTER_URL.CLIENT}>
        <Route index element={<Navigate to={ROUTER_URL.CLIENT_ROUTER.PROFILE} replace />} />

        {CLIENT_MENU.map((item) => (
          <Route key={item.path} path={item.path} element={<item.component />} />
        ))}
      </Route>
    </Route>
  </Route>
);
