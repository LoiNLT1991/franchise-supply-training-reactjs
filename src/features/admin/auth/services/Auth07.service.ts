import { httpClient } from "@/api";
import { API_PATHS } from "@/config";

export const adminLogoutApi = (): Promise<null> => {
  return httpClient.post({ url: API_PATHS.ADMIN.AUTH.LOGOUT });
};
