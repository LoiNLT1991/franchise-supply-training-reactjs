import { httpClient } from "@/api";
import { API_PATHS } from "@/config";
import type { PublicProduct } from "@/models";

// Get products by franchiseId and by category
export const getProducts = (franchiseId: string, categoryId?: string): Promise<PublicProduct[] | null> => {
  return httpClient.get({ url: API_PATHS.CLIENT.PUBLIC.CLIENT_04(franchiseId, categoryId) });
};
