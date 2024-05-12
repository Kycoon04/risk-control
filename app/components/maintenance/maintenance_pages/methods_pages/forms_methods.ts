"use client";
import { Form } from "@/types";
import { Success,Error } from "../../../notifications/alerts";
import { Dispatch, SetStateAction } from "react";
import { fetchForms} from "../../../actions/actions_forms/actions";
export const param = {
    id: "",
    name: "",
    state: "",
    inicialperiod: "",
    finalperiod: "",
};

export const filtered = (unfiltered:Form[], filters:Partial<Form>) => {
    const filteredLoggers = unfiltered.filter(item => {
        return Object.keys(filters).every(key => {
            const filterValue = filters[key as keyof Form];
            const itemValue = item[key as keyof Form];
            if (typeof filterValue === 'number' || typeof itemValue === 'number') {
                const stringValue = String(filterValue).toLowerCase();
                const itemStringValue = String(itemValue).toLowerCase();
                return itemStringValue.includes(stringValue);
            }else {
                return itemValue.toLowerCase().includes((filterValue || "").toLowerCase());
            }
        });
    });
    return filteredLoggers;
}

export const stateDeleted = async (deletionResult:boolean,setForms:Dispatch<SetStateAction<Form[]>>, setUnfiltered:Dispatch<SetStateAction<Form[]>>) => {
    if (deletionResult) {
        Success('Formulario eliminado correctamente')
        const fetchedSections = await fetchForms();
        updateData(setForms,setUnfiltered,fetchedSections);
    } else {
        Error('Error al intentar eliminar el formulario');
    }
}
export const updateData = (setForms:Dispatch<SetStateAction<Form[]>>, setUnfiltered:Dispatch<SetStateAction<Form[]>>, fetchedSections:any) => {
    setForms(fetchedSections.props.data);
    setUnfiltered(fetchedSections.props.data);
}