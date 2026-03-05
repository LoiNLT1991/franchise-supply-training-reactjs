import { httpClient } from "@/api";
import { API_PATHS } from "@/config";

export const refreshCustomerTokenApi = (): Promise<null> => {
  return httpClient.get({ url: API_PATHS.CLIENT.AUTH.REFRESH_TOKEN });
};
