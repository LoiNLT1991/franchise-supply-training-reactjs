import { HttpError } from "@/api/http.types";
import { getAdminProfileApi } from "@/features";
import type { AdminAuthProfile, Role } from "@/models";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AdminAuthState {
  user: AdminAuthProfile | null;
  roles: Role[] | null;

  isLoggedIn: boolean;
  isInitialized: boolean;
  requireContextSelection: boolean;

  setUser: (user: AdminAuthProfile, isLoggedIn?: boolean) => void;
  setRoles: (roles: Role[]) => void;
  clearUser: () => void;

  initializeAdminAuth: () => Promise<void>;
}

export const useAdminAuthStore = create<AdminAuthState>()(
  persist(
    (set, get) => ({
      user: null,
      roles: null,

      isLoggedIn: false,
      isInitialized: false,
      requireContextSelection: false,

      setUser: (user, isLoggedIn: boolean = true) =>
        set({
          user,
          roles: [],
          isLoggedIn,
          requireContextSelection: false,
        }),

      setRoles: (roles) =>
        set({
          roles,
          requireContextSelection: true,
        }),

      clearUser: () =>
        set({
          user: null,
          roles: null,
          isLoggedIn: false,
          requireContextSelection: false,
        }),

      initializeAdminAuth: async () => {
        const { isInitialized, isLoggedIn } = get();

        if (isInitialized) return;

        if (!isLoggedIn) {
          set({ isInitialized: true });
          return;
        }

        try {
          const profile = await getAdminProfileApi();

          if (profile) {
            set({
              user: profile,
              isLoggedIn: true,
            });
          }
        } catch (error) {
          if (error instanceof HttpError && error.status === 401) {
            set({
              user: null,
              isLoggedIn: false,
            });
          } else {
            console.error(error);
          }
        } finally {
          set({
            isInitialized: true,
          });
        }
      },
    }),
    {
      name: "admin-auth-storage",
      partialize: (state) => ({
        userId: state.user?.user.id,
        isLoggedIn: state.isLoggedIn,
      }),
    },
  ),
);
