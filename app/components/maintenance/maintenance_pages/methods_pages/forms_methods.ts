"use client";
import { Form,FormFecth } from "@/types";
import { Success,Error } from "../../../notifications/alerts";
import { Dispatch, SetStateAction } from "react";
import { fetchForms} from "../../../actions/actions_forms/actions";
export const param: Form = {
    id: "",
    name: "",
    state: "",
    inicialperiod: "",
    finalperiod: "",
    complete: "",
};
export let params: FormFecth = {
    id: "",
    name: "",
    state: "",
    inicialperiod: "",
    finalperiod: "",
    complete: "",
    page: 1,
    limit: 4,
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
                return itemValue?.toLowerCase().includes((filterValue || "").toLowerCase());
            }
        });
    });
    return filteredLoggers;
}

export const stateDeleted = async (deletionResult:boolean,setForms:Dispatch<SetStateAction<Form[]>>, setUnfiltered:Dispatch<SetStateAction<Form[]>>,setCount: Dispatch<SetStateAction<number>>) => {
    if (deletionResult) {
        Success('Formulario eliminado correctamente')
        const fetchedSections = await fetchForms(param);
        updateData(setForms,setUnfiltered,fetchedSections,setCount);

    } else {
        Error('Error al intentar eliminar el formulario');
    }
}
export const updateData = (setForms:Dispatch<SetStateAction<Form[]>>, setUnfiltered:Dispatch<SetStateAction<Form[]>>, fetchedSections:any,setCount: Dispatch<SetStateAction<number>>) => {
    setForms(fetchedSections.props.data);
    setUnfiltered(fetchedSections.props.data);
    setCount(fetchedSections.props.pagination.totalRecords);
}