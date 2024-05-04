import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Role} from "@/types";
type AuthStore = {
    role: Role;
    setRole: (newRole: Role) => void;
}
const anRole: Role = {
    id: "",
    name:"",
    active:"",
};
export const useAuthStore = create<AuthStore>()(persist(
    (set) => ({
        role: anRole,
        setRole: (newRole: Role) => {
            set(() => ({
                role: newRole
            }))
        },
    }),
    {
        name: "auth-storage",
        getStorage: () => localStorage
    }
));
