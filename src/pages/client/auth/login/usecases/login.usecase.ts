import { getCustomerProfileApi } from "@/features";
import { useCustomerAuthStore } from "@/stores";
import type { LoginPayload } from "../model";
import { loginApi } from "../services";

export const loginUseCase = async (payload: LoginPayload): Promise<void> => {
  // 1: login
  await loginApi(payload);

  // 2: get profile
  const profile = await getCustomerProfileApi().catch(async () => {
    await new Promise((r) => setTimeout(r, 200));
    return getCustomerProfileApi();
  });

  // 3: set profile to store
  if (profile) {
    useCustomerAuthStore.getState().setCustomer(profile);
  }
};
