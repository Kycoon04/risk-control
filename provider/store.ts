import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Section, User } from "./types";
type AuthStore = {
    logged: boolean;
    rol: string;
    user: User | null;
    form: Form | null;
    section: Section;
    changeLogged: () => void;
    setUser: (newUser: User) => void;
    setForm: (newForm: Form) => void;
    setSection: (newSection: Section) => void;
    setRol: (newRol: string) => void;
}
export interface Form {
    id: string;
    name: string;
    state: string;
    inicialperiod: string;
    finalperiod: string;
}
export const useAuthStore = create<AuthStore>()(persist(
    (set) => ({
        rol: "",
        logged: false,
        user: null,
        form: null,
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
        setRol: (newRol: string) => set({ rol: newRol })
    }),
    {
        name: "auth-storage",
        getStorage: () => localStorage
    }
));
