import {create} from "zustand";
import { persist } from "zustand/middleware";
export interface User{
    id:number;
    name :string;
    second_name :string;
    surname:string;
    second_surname:string;
    email:string;
    password:string;
    phone_number:string;
    nickname:string;
    identification:string;
    create_account:string;
    department:number;
    role:string;
}

export interface Form {
    id: number;
    name: string;
    state: number;
    inicialperiod: Date;
    finalperiod: Date;
}
export interface Section {
    id:string,
    name: string,
    description: string,
    forms: number,
  };
type AuthStore = {
    logged: boolean;
    user: User | null;
    form: Form | null;
    section: Section | null;
    changeLogged: ()=> void;
    setUser:(newUser:User) => void;
    setForm:(newForm:Form) => void;
    setSection:(newSection:Section) => void;
}

export const useAuthStore = create<AuthStore>()(persist(
    (set) => ({
        logged: false,
        user: null,
        form: null,
        section:null,
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
        setSection: (newSection: Section) => set({ section: newSection })
    }),
    {
        name: "auth-storage", 
        getStorage: () => localStorage 
    }
));
