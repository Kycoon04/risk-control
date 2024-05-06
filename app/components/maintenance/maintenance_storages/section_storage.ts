import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Section} from "@/types";
type AuthStore = {
    section: Section;
    setSection: (newSection: Section) => void;
}
const anSection: Section = {
    id: "",
    name:"",
    description:"",
    forms: "",
    complete: "",
};
export const useAuthStore = create<AuthStore>()(persist(
    (set) => ({
        section: anSection,
        setSection: (newSection: Section) => {
            set(() => ({
                section: newSection
            }))
        },
    }),
    {
        name: "auth-storage",
        getStorage: () => localStorage
    }
));
