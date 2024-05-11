import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Section, User,Role,RoleXUser } from "@/types";
type AuthStore = {
    rol: RoleXUser;
    user: User;
    setUser: (newUser: User) => void;
    setRol: (newRol: RoleXUser) => void;
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
const role:RoleXUser={
    id: "",
    user:"",
    role: "",
}
export const useAuthStore = create<AuthStore>()(persist(
    (set) => ({
        rol: role,
        user: paramUser,
        setUser: (newUser: User) => {
            set(() => ({
                user: newUser
            }))
        },
        setRol: (newRol: RoleXUser) => set(()=>({ rol: newRol }))
    }),
    {
        name: "auth-storage",
        getStorage: () => localStorage
    }
));
