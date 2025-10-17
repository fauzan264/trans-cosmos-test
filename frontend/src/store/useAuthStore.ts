import { decodeToken } from "@/utils/decodeToken";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IUseAuthStoreState {
  id: string;
  name: string;
  role: string;
  token: string;
}

interface IUseAuthStore extends IUseAuthStoreState {
  _hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
  setAuth: ({ token, id, name, role }: IUseAuthStoreState) => void;
  logout: () => void;
}

const useAuthStore = create<IUseAuthStore>()(
  persist(
    (set) => ({
      token: "",
      id: "",
      name: "",
      role: "",
      _hasHydrated: false,
      setHasHydrated: (state) => {
        set({ _hasHydrated: state });
      },
      setAuth: ({
        token,
        id,
        name,
        role,
      }: {
        token: string;
        id: string;
        name: string;
        role: string;
      }) => {
        set({ token, id, name, role });
      },
      logout: () => {
        set({ token: "", id: "", name: "", role: "" });
        localStorage.removeItem("authToken");
      },
    }),
    {
      name: "authToken",
      partialize: (state) => ({ token: state.token }),
      onRehydrateStorage: () => (state) => {
        if (state?.token) {
          const decoded = decodeToken(state.token);
          if (decoded) {
            state.role = decoded.role || "";
          }
        }
        state?.setHasHydrated(true);
      },
    }
  )
);

export default useAuthStore;
