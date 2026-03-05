import { httpClient } from "@/api";
import { API_PATHS } from "@/config";
import type { SwitchContextPayload } from "../models";

export const switchContextApi = (payload: SwitchContextPayload): Promise<null> => {
  return httpClient.post<null, SwitchContextPayload>({
    url: API_PATHS.ADMIN.AUTH.SWITCH_CONTEXT,
    data: payload,
  });
};
