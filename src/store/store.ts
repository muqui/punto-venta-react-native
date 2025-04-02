import { create } from "zustand";
import { jwtDecode } from "jwt-decode";

type UserToken = {
  email: string;
  exp: number;
  iat: number;
  roles: string[];
};

type AuthState = {
  token: string | null;
  user: UserToken | null;
  setToken: (token: string | null) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,
  setToken: (token) => {
    if (token) {
      try {
        const decodedUser = jwtDecode<UserToken>(token);
        set({ token, user: decodedUser });
      } catch (error) {
        console.error("Error decodificando el token:", error);
        set({ token: null, user: null });
      }
    } else {
      set({ token: null, user: null });
    }
  },
  logout: () => set({ token: null, user: null }),
}));
