import { create } from "zustand";
import { persist } from "zustand/middleware";
import {Form} from "@/types";
type AuthStore = {
    form: Form;
    setForm: (newForm: Form) => void;
}
const anForm: Form = {
    id: "",
    name:"",
    state: "",
    inicialperiod:"",
    finalperiod: "",
    complete: ""
};
export const useAuthStore = create<AuthStore>()(persist(
    (set) => ({
        form: anForm,
        setForm: (newForm: Form) => {
            set(() => ({
                form: newForm
            }))
        },
    }),
    {
        name: "auth-storage",
        getStorage: () => localStorage
    }
));
