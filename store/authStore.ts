import { SignInFormInput } from "@/response/auth.res";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  user: SignInFormInput | null;
  token: string | null;
  hydrated: boolean;

  setHydrated: (state: boolean) => void;
  setAuth: (user: SignInFormInput, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      hydrated: false,
      setHydrated: (state) => set({ hydrated: state }),
      setAuth: (user, token) => set({ user, token }),
      logout: () => set({ user: null, token: null }),
    }),
    {
      name: "auth-storage",
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    },
  ),
);
