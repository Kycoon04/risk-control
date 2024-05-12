import { useState, useEffect } from "react";
import { fetchSections, fetchAnswers } from "../actions/actions";
import { useAuthStore } from "@/provider/store";
import { Section, FecthAnswers, paramsSection } from '@/types';

export const useDataPreparation = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const forms = useAuthStore((state) => state.form);
    const [sections, setSections] = useState<Section[]>([]);
    const [Answers, setAnswers] = useState<FecthAnswers[]>([]);

    const param: paramsSection = {
        id: "",
        forms: forms?.id?.toString(),
        name: "",
        description: "",
        complete: "",
    };

    const answer = {
        id: "", user: "", option: "",
        TL_Options: { id: "", option: "", question: "", score: "",
            TL_Questions:{ id: "", question:"", description:"", section:"",
                TL_Sections:{ id: "", name: "", description: "", forms:"",
                    TL_forms:{ id: forms?.id.toString() || "", name: "", state: "", inicialperiod: "", finalperiod: "", complete: "" },
                    complete: "",
                },
            }
        },
    };

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const fetchedSections = await fetchSections(param);
            setSections(fetchedSections.props.data);
            const fetchedAnswers = await fetchAnswers(answer)
            setAnswers(fetchedAnswers.props.data);
            setIsLoading(false);
        };
        fetchData();
    }, []);

    return { isLoading, sections, Answers };
};
