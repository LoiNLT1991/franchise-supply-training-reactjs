import { httpClient } from "@/api";
import { API_PATHS } from "@/config";
import type { CustomerAuthProfile } from "@/models";

export const getCustomerProfileApi = (): Promise<CustomerAuthProfile | null> => {
  return httpClient.get({ url: API_PATHS.CLIENT.AUTH.DEFAULT });
};