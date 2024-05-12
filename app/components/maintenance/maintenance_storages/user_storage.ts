import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Section, User,Role,RoleXUser } from "@/types";
type AuthStore = {
    user: User;
    setUser: (newUser: User) => void;
}
const paramUser: User = {
    id: "",
    name: "",
    second_name: "",
    surname: "",
    second_surname: "",
    email: "", 
    phone_number: "",
    nickname: "",
    identification: "",
    department: ""
};

export const useAuthStore = create<AuthStore>()(persist(
    (set) => ({
        user: paramUser,
        setUser: (newUser: User) => {
            set(() => ({
                user: newUser
            }))
        },
    }),
    {
        name: "auth-storage",
        getStorage: () => localStorage
    }
));
