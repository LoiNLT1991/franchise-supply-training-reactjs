import { httpClient } from "@/api";
import { API_PATHS } from "@/config";
import type { AdminAuthProfile } from "@/models";

export const getAdminProfileApi = (): Promise<AdminAuthProfile | null> => {
  return httpClient.get({ url: API_PATHS.ADMIN.AUTH.DEFAULT });
};
