import { getAdminProfileApi } from "@/features";
import { useAdminAuthStore } from "@/stores";
import type { SwitchContextPayload } from "../models";
import { switchContextApi } from "../services";

export const switchContextUseCase = async (payload: SwitchContextPayload): Promise<void> => {
  // 1: call api
  await switchContextApi(payload);

  // 2: get profile
  const profile = await getAdminProfileApi();

  if (profile) {
    useAdminAuthStore.getState().setUser(profile);
  }
};
