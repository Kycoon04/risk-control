import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Section, User,Role } from "@/types";
type AuthStore = {
    rol: Role;
    user: User;
    setUser: (newUser: User) => void;
    setRol: (newRol: Role) => void;
}
const user: User = {
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
const role:Role={
    id: "",
    name:"",
    active: "",
}
export const useAuthStore = create<AuthStore>()(persist(
    (set) => ({
        rol: role,
        user: user,
        setUser: (newUser: User) => {
            set(() => ({
                user: newUser
            }))
        },
        setRol: (newRol: Role) => set(()=>({ rol: newRol }))
    }),
    {
        name: "auth-storage",
        getStorage: () => localStorage
    }
));
