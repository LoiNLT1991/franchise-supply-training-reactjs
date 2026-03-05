import { HttpError } from "@/api/http.types";
import { getCustomerProfileApi } from "@/features";
import type { CustomerAuthProfile } from "@/models";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CustomerAuthState {
  customer: CustomerAuthProfile | null;
  customerId: string | null;
  isInitialized: boolean;
  isLoading: boolean;

  setCustomer: (customer: CustomerAuthProfile) => void;
  clearCustomer: () => void;
  initializeCustomerAuth: () => Promise<void>;
}

export const useCustomerAuthStore = create<CustomerAuthState>()(
  persist(
    (set, get) => ({
      customer: null,
      customerId: null,

      isInitialized: false,
      isLoading: false,

      setCustomer: (customer) =>
        set({
          customer,
          customerId: customer.id,
        }),

      clearCustomer: () =>
        set({
          customer: null,
          customerId: null,
        }),

      initializeCustomerAuth: async () => {
        const { customerId, isInitialized } = get();

        if (isInitialized) return;

        if (!customerId) {
          set({ isInitialized: true });
          return;
        }

        set({ isLoading: true });

        try {
          const profile = await getCustomerProfileApi();

          set({
            customer: profile,
            isInitialized: true,
            isLoading: false,
          });
        } catch (error) {
          if (error instanceof HttpError && error.status === 401) {
            return;
          }
          console.log(error);
          set({
            customer: null,
            isInitialized: true,
            isLoading: false,
          });
        }
      },
    }),
    {
      name: "customer-auth-storage",

      partialize: (state) => ({
        customerId: state.customerId,
      }),
    },
  ),
);
