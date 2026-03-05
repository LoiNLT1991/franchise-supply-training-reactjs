import { httpClient } from "@/api";
import { API_PATHS } from "@/config";

export const refreshAdminTokenApi = (): Promise<null> => {
  return httpClient.get({ url: API_PATHS.ADMIN.AUTH.REFRESH_TOKEN });
};
