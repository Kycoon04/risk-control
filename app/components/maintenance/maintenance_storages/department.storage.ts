import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ParamDepartment} from "@/types";
type AuthStore = {
    department: ParamDepartment;
    setDepartment: (newDepartment: ParamDepartment) => void;
}
const Department: ParamDepartment = {
    id: "",
    name:"",
    description:"",
    unit: "",
};
export const useAuthStore = create<AuthStore>()(persist(
    (set) => ({
        department: Department,
        setDepartment: (newDepartment: ParamDepartment) => {
            set(() => ({
                department: newDepartment
            }))
        },
    }),
    {
        name: "auth-storage",
        getStorage: () => localStorage
    }
));
