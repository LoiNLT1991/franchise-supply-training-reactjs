import { HttpError } from "@/api/http.types";
import { getFranchiseDetailApi, getFranchisesApi } from "@/features";
import type { BaseSelectItem, PublicFranchise } from "@/models";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FranchiseState {
  franchises: BaseSelectItem[];
  selectedFranchiseId: string | null;
  selectedFranchise: PublicFranchise | null;
  isInitialized: boolean;

  setFranchises: (data: BaseSelectItem[]) => void;
  setSelectedFranchiseId: (id: string) => void;
  setFranchiseDetail: (detail: PublicFranchise) => void;
  initializeFranchise: () => Promise<void>;
}

export const useFranchiseStore = create<FranchiseState>()(
  persist(
    (set, get) => ({
      franchises: [],
      selectedFranchiseId: null,
      selectedFranchise: null,
      isInitialized: false,

      setFranchises: (data) =>
        set({
          franchises: data,
        }),

      setSelectedFranchiseId: (id) =>
        set({
          selectedFranchiseId: id,
        }),

      setFranchiseDetail: (detail) =>
        set({
          selectedFranchise: detail,
        }),

      initializeFranchise: async () => {
        const { isInitialized, selectedFranchiseId } = get();

        if (isInitialized) return;

        try {
          const franchises = await getFranchisesApi();

          set({
            franchises: franchises || [],
          });

          if (selectedFranchiseId) {
            const detail = await getFranchiseDetailApi(selectedFranchiseId);

            set({
              selectedFranchise: detail,
            });
          }
        } catch (error) {
          if (error instanceof HttpError && error.status === 401) {
            return;
          }
          console.log(error);
        } finally {
          set({
            isInitialized: true,
          });
        }
      },
    }),
    {
      name: "client-franchise-storage",

      partialize: (state) => ({
        selectedFranchiseId: state.selectedFranchiseId,
      }),
    },
  ),
);
