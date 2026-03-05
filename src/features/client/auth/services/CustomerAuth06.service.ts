import { httpClient } from "@/api";
import { API_PATHS } from "@/config";

export const customerLogoutApi = (): Promise<null> => {
  return httpClient.post({ url: API_PATHS.CLIENT.AUTH.LOGOUT });
};