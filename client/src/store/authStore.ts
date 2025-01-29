import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  username: string | null;
  token: string | null;
  login: (username: string, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      username: "",
      token: "",
      login: (username, token) => set({ username, token }),
      logout: () => set({ username: "", token: "" }),
    }),
    { name: "auth-storage" }
  )
);
