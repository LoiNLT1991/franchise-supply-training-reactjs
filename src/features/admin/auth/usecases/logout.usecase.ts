import { useAdminAuthStore } from "@/stores";
import { adminLogoutApi } from "../services/Auth07.service";

export const adminLogoutUseCase = async () => {
  try {
    await adminLogoutApi();
  } finally {
    useAdminAuthStore.getState().clearUser();
  }
};
