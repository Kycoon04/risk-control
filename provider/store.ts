import { create } from "zustand";
import { persist } from "zustand/middleware";
export interface User {
    id: string;
    name: string;
    second_name: string;
    surname: string;
    second_surname: string;
    email: string;
    phone_number: string;
    nickname: string;
    identification: string;
    department: string;
}
export interface Form {
    id: number;
    name: string;
    state: number;
    inicialperiod: Date;
    finalperiod: Date;
}
export interface Section {
    id: string,
    name: string,
    description: string,
    forms: number,
    complete:string
};
export interface RoleXUser {
    id: string;
    user: string;
    role: string;
};
export interface Role {
    id: string;
    name: string;
    active: string;
};
export interface Options {
    id: string;
    option: string;
    question: string | undefined;
    score: string;
    TL_Questions:{
        id: "",
        question:"",
        description:"",
        section:"",
    };
};
export interface graphicData {
    labels: string[];
    datasets: {
        label: string;
        backgroundColor: string;
        borderColor: string;
        borderWidth: number;
        hoverBackgroundColor: string;
        hoverBorderColor: string;
        pointBackgroundColor?: string;
        pointBorderColor?: string;
        pointHoverBackgroundColor?: string;
        pointHoverBorderColor?: string;
        borderDash?: number[];
        data: number[];
    }[];
}
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
            forms: 0,
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
