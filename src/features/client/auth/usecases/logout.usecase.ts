import { useCustomerAuthStore } from "@/stores";
import { customerLogoutApi } from "../services/CustomerAuth06.service";

export const customerLogoutUseCase = async () => {
  try {
    await customerLogoutApi();
  } finally {
    useCustomerAuthStore.getState().clearCustomer();
  }
};
