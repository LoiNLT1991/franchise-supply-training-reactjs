import { httpClient } from "@/api";
import { API_PATHS } from "@/config";
import type { PublicProduct } from "@/models";

// Get product detail by franchiseId and productId
export const getProductDetail = (franchiseId: string, productId: string): Promise<PublicProduct | null> => {
  return httpClient.get({ url: API_PATHS.CLIENT.PUBLIC.CLIENT_05(franchiseId, productId) });
};
