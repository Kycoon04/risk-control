import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ParamOption} from "@/types";
type AuthStore = {
    option: ParamOption;
    setOption: (newOption: ParamOption) => void;
}
export const Option: ParamOption = {
    id: "",
    option: "",
    question: "",
    score: "",
};
export const useAuthStore = create<AuthStore>()(persist(
    (set) => ({
        option: Option,
        setOption: (newOption: ParamOption) => {
            set(() => ({
                option: newOption
            }))
        },
    }),
    {
        name: "auth-storage",
        getStorage: () => localStorage
    }
));
