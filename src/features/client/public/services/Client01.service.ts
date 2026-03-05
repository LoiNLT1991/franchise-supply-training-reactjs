import { httpClient } from "@/api";
import { API_PATHS } from "@/config";
import type { BaseSelectItem } from "@/models";

// Get all franchises
export const getFranchisesApi = (): Promise<BaseSelectItem[] | null> => {
  return httpClient.get({ url: API_PATHS.CLIENT.PUBLIC.CLIENT_01 });
};
