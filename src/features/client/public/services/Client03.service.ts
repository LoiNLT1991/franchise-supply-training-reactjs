import { httpClient } from "@/api";
import { API_PATHS } from "@/config";
import type { PublicMenuItem } from "@/models";

// Get menu (all products) by franchiseId and filter by category (optional by categoryId)
export const getMenuApi = (franchiseId: string, categoryId?: string): Promise<PublicMenuItem[] | null> => {
  return httpClient.get({ url: API_PATHS.CLIENT.PUBLIC.CLIENT_03(franchiseId, categoryId) });
};
