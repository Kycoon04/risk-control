import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ParamQuestions} from "@/types";
type AuthStore = {
    question: ParamQuestions;
    setQuestion: (newQuestion: ParamQuestions) => void;
}
const Question: ParamQuestions = {
    id: "",
    question:"",
    description:"",
    section: "",
};
export const useAuthStore = create<AuthStore>()(persist(
    (set) => ({
        question: Question,
        setQuestion: (newQuestion: ParamQuestions) => {
            set(() => ({
                question: newQuestion
            }))
        },
    }),
    {
        name: "auth-storage",
        getStorage: () => localStorage
    }
));
