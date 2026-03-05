import { httpClient } from "@/api";
import { API_PATHS } from "@/config";
import type { LoginPayload } from "../model";


export const loginApi = (payload: LoginPayload): Promise<null> => {
  return httpClient.post<null, LoginPayload>({
    url: API_PATHS.CLIENT.AUTH.DEFAULT,
    data: payload,
  });
};
