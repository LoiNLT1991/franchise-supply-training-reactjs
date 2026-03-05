import { httpClient } from "@/api";
import { API_PATHS } from "@/config";
import type { PublicCategory } from "@/models";


// Get all categories by franchiseId
export const getAllCategoriesApi= (franchiseId: string): Promise<PublicCategory[] | null> => {
  return httpClient.get({ url: API_PATHS.CLIENT.PUBLIC.CLIENT_02(franchiseId) });
};
