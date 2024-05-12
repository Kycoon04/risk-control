"use client";
import { ParamQuestions } from "@/types";
import { Dispatch, SetStateAction } from "react";
import { Success, Error } from "../../../notifications/alerts";
import { fetchQuestion, deleteQuestion } from "../../../actions/actions_questions/actions";
export const param: ParamQuestions = {
    id: "",
    question: "",
    description: "",
    section: "",
};

export const filtered = (unfiltered:ParamQuestions[],filters:Partial<ParamQuestions>) => {
    const filteredQuestions = unfiltered.filter(item => {
        return Object.keys(filters).every(key => {
            const filterValue = filters[key as keyof ParamQuestions];
            const itemValue = item[key as keyof ParamQuestions];

            if (typeof filterValue === 'number' || typeof itemValue === 'number') {
                const stringValue = String(filterValue).toLowerCase();
                const itemStringValue = String(itemValue).toLowerCase();
                return itemStringValue.includes(stringValue);
            } else {
                return itemValue.toLowerCase().includes((filterValue || "").toLowerCase());
            }
        });
    });
    return filteredQuestions;
}

export const stateDeleted = async (deletionResult:boolean, setQuestions:Dispatch<SetStateAction<ParamQuestions[]>>, setUnfiltered:Dispatch<SetStateAction<ParamQuestions[]>>) => {
    if (deletionResult) {
        Success('Pregunta eliminada correctamente')
        const fetchedQuestions = await fetchQuestion(param);
        updateData(setQuestions,setUnfiltered,fetchedQuestions);
    } else {
        Error('Error al intentar eliminar la pregunta');
    }
}

export const updateData = (setQuestions:Dispatch<SetStateAction<ParamQuestions[]>>, setUnfiltered:Dispatch<SetStateAction<ParamQuestions[]>>,fetchedQuestions:any) => {
    setQuestions(fetchedQuestions.props.data);
    setUnfiltered(fetchedQuestions.props.data);
}