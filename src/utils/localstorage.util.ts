import { LOCAL_STORAGE } from "@/consts";
import type { AdminAuthProfile } from "@/models";

export function setItemInLocalStorage<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getItemInLocalStorage<T>(key: string): T | null {
  try {
    const data = localStorage.getItem(key);
    if (!data) return null;

    return JSON.parse(data) as T;
  } catch (error) {
    console.error("LocalStorage error:", error);
    return null;
  }
}

export function removeItemInLocalStorage(key: string): void {
  localStorage.removeItem(key);
}

// ===== AUTH HELPERS =====

export function getCurrentUser(): AdminAuthProfile | null {
  return getItemInLocalStorage<AdminAuthProfile>(LOCAL_STORAGE.ACCOUNT_USER);
}

export function getCurrentUserId(): string | null {
  return getCurrentUser()?.user?.id ?? null;
}

export function getCurrentUserRole(): string | null {
  return getCurrentUser()?.user?.id ?? null;
}

export function isUserLoggedIn(): boolean {
  return !!getCurrentUser();
}
