import { httpClient } from "@/api";
import { API_PATHS } from "@/config";
import type { PublicFranchise } from "@/models";

export const getFranchiseDetailApi = (franchiseId: string): Promise<PublicFranchise | null> => {
  return httpClient.get({ url: API_PATHS.CLIENT.PUBLIC.CLIENT_06(franchiseId) });
};
