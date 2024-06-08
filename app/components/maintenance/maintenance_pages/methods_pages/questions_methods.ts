"use client";
import { ParamQuestions,ParamQuestionsFetch } from "@/types";
import { Dispatch, SetStateAction } from "react";
import { Success, Error } from "../../../notifications/alerts";
import { fetchQuestion, deleteQuestion } from "../../../actions/actions_questions/actions";
export const param: ParamQuestions = {
    id: "",
    question: "",
    description: "",
    section: "",
};
export const params: ParamQuestionsFetch = {
    id: "",
    question: "",
    description: "",
    section: "",
    page: 1,
    limit: 4,
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

export const stateDeleted = async (deletionResult:boolean, setQuestions:Dispatch<SetStateAction<ParamQuestions[]>>, setUnfiltered:Dispatch<SetStateAction<ParamQuestions[]>>,setCount: Dispatch<SetStateAction<number>>) => {
    if (deletionResult) {
        Success('Pregunta eliminada correctamente')
        const fetchedQuestions = await fetchQuestion(param);
        updateData(setQuestions,setUnfiltered,fetchedQuestions,setCount);
    } else {
        Error('Error al intentar eliminar la pregunta');
    }
}

export const updateData = (setQuestions:Dispatch<SetStateAction<ParamQuestions[]>>, setUnfiltered:Dispatch<SetStateAction<ParamQuestions[]>>,fetchedQuestions:any,setCount: Dispatch<SetStateAction<number>>) => {
    setQuestions(fetchedQuestions.props.data);
    setUnfiltered(fetchedQuestions.props.data);
    console.log(fetchedQuestions.props.pagination.totalRecords)
    setCount(fetchedQuestions.props.pagination.totalRecords);
}