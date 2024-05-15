import { useState, useEffect } from "react";
import { fetchSections, fetchAnswers } from "../actions/actions";
import { useAuthStore } from "@/provider/store";
import { Section, FecthAnswers, paramsSection,Department,departXForms} from '@/types';
import {fetchDepartment} from "@/app/components/actions/actions_departments/actions"
import {fetchDepartXIdForms} from "@/app/components/actions/actions_deparxforms/actions"
export const useDataPreparation = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const forms = useAuthStore((state) => state.form);
    const [sections, setSections] = useState<Section[]>([]);
    const [Answers, setAnswers] = useState<FecthAnswers[]>([]);
    const [departments, setDepartments] = useState<Department[]>([]);
    const [departXForms, setDepartXForms] = useState<departXForms[]>([]);
    const param: paramsSection = {
        id: "",
        forms: forms?.id?.toString(),
        name: "",
        description: "",
        complete: "",
    };
    const paramDepart: Department = {
        id: "",
        name: "",
        description: "",
        unit: "",
    }
    const answer = {
        id: "", user: "",        
        TL_Users:{ id: "",name: "",second_name: "",surname: "",second_surname: "",email: "", phone_number: "",nickname: "",identification: "",department: "",
            TL_Departaments:{id: "",name:"",description:"",unit: "",
            },
        },  
        option: "",
        TL_Options: { id: "", option: "", question: "", score: "",
            TL_Questions:{ id: "", question:"", description:"", section:"",
                TL_Sections:{ id: "", name: "", description: "", forms:"",
                    TL_forms:{ id: forms?.id.toString() || "", name: "", state: "", inicialperiod: "", finalperiod: "", complete: "" },
                    complete: "",
                },
            },
        },
    };

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const fetchedDepartments = await fetchDepartment(paramDepart);
            setDepartments(fetchedDepartments.props.data);
            const fetchedDepartXForm = await fetchDepartXIdForms(forms.id);
            setDepartXForms(fetchedDepartXForm);
            const fetchedSections = await fetchSections(param);
            setSections(fetchedSections.props.data);
            const fetchedAnswers = await fetchAnswers(answer)
            setAnswers(fetchedAnswers.props.data);
            setIsLoading(false);
        };
        fetchData();
    }, []);
    return { isLoading, sections, Answers,departments,departXForms };
};
