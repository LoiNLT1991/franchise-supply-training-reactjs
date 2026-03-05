import { getAdminProfileApi } from "@/features";
import { useAdminAuthStore } from "@/stores";
import type { LoginPayload, LoginResult } from "../models";
import { loginApi } from "../services";

export const LOGIN_RESULT_TYPE = {
  SUCCESS: "SUCCESS",
  REQUIRE_CONTEXT: "REQUIRE_CONTEXT",
};

export const loginUseCase = async (payload: LoginPayload): Promise<LoginResult> => {
  // 1: login
  await loginApi(payload);

  // 2: get profile
  const profile = await getAdminProfileApi().catch(async () => {
    await new Promise((r) => setTimeout(r, 200));
    return getAdminProfileApi();
  });

  // 3: Check active context
  if (profile) {
    // 3.1 : If context is not already provided
    if (profile && !profile?.active_context) {
      useAdminAuthStore.getState().setUser(profile, false);
      return {
        type: "REQUIRE_CONTEXT",
        roles: profile.roles,
      };
    }

    // 3.2 : If context is already provided
    useAdminAuthStore.getState().setUser(profile);
  }

  return { type: "SUCCESS" };
};
