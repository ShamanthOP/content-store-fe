import { create } from "zustand";

interface useUserStore {
    token: string;
    userId: string;
    setToken: (token: string) => void;
    setUserId: (userId: string) => void;
}

export const useUser = create<useUserStore>((set) => ({
    token: "",
    userId: "",
    setToken: (token) => set({ token: token }),
    setUserId: (userId) => set({ userId: userId }),
}));
