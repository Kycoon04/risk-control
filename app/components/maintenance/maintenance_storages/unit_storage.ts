import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ParamUnit} from "@/types";
type AuthStore = {
    unit: ParamUnit;
    setUnit: (newUnit: ParamUnit) => void;
}
const Unit: ParamUnit = {
    id: "",
    name:"",
    description:"",
};
export const useAuthStore = create<AuthStore>()(persist(
    (set) => ({
        unit: Unit,
        setUnit: (newUnit: ParamUnit) => {
            set(() => ({
                unit: newUnit
            }))
        },
    }),
    {
        name: "auth-storage",
        getStorage: () => localStorage
    }
));
