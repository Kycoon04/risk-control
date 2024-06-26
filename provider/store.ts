import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Section, User,Role } from "@/types";
type AuthStore = {
    logged: boolean;
    rol: Role[]| null;
    user: User | null;
    form: Form;
    section: Section;
    changeLogged: () => void;
    setUser: (newUser: User) => void;
    setForm: (newForm: Form) => void;
    setSection: (newSection: Section) => void;
    setRol: (newRol: Role[]) => void;
}
export interface Form {
    id: string;
    name: string;
    state: string;
    inicialperiod: string;
    finalperiod: string;
    complete:string;
}
export const useAuthStore = create<AuthStore>()(persist(
    (set) => ({
        rol: null,
        logged: false,
        user: null,
        form: {
            id: "",
            name: "",
            state: "",
            inicialperiod: "",
            finalperiod: "",
            complete:""
        },
        section: {
            id: "",
            name: "",
            description: "",
            forms: "",
            complete:""
        },
        changeLogged: () => {
            set((state) => ({
                logged: !state.logged
            }))
        },
        setUser: (newUser: User) => {
            set(() => ({
                user: newUser
            }))
        },
        setForm: (newForm: Form) => set({ form: newForm }),
        setSection: (newSection: Section) => set({ section: newSection }),
        setRol: (newRol: Role[]) => set({ rol: newRol })
    }),
    {
        name: "auth-storage",
        getStorage: () => localStorage
    }
));
