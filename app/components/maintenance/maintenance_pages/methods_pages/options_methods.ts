"use client";
import { ParamOption } from "@/types";
import { Success, Error } from "../../../notifications/alerts";
import {fetchOptions} from "../../../actions/actions_options/actions";
import { Dispatch, SetStateAction } from "react";

export const param: ParamOption = {
    id: "",
    option: "",
    question: "",
    score: "",

};
export const filtered = (unfiltered:ParamOption[], filters:Partial<ParamOption>) =>{
    const filteredOptions = unfiltered.filter(item => {
        return Object.keys(filters).every(key => {
            const filterValue = filters[key as keyof ParamOption];
            const itemValue = item[key as keyof ParamOption];
            if (typeof filterValue === 'number' || typeof itemValue === 'number') {
                const stringValue = String(filterValue).toLowerCase();
                const itemStringValue = String(itemValue).toLowerCase();
                return itemStringValue.includes(stringValue);
            } else {
                return itemValue.toLowerCase().includes((filterValue || "").toLowerCase());
            }
        });
    });
    return filteredOptions;
}

export const stateDeleted = async (deletionResult:boolean, setOptions:Dispatch<SetStateAction<ParamOption[]>>, setUnfiltered:Dispatch<SetStateAction<ParamOption[]>> ) => {
    if (deletionResult) {
        Success('Opción de pregunta eliminada correctamente')
        const fetchedOptions = await fetchOptions(param);
        updateData(setOptions,setUnfiltered,fetchedOptions);
    } else {
        Error('Error al intentar eliminar la opción de pregunta');
    }
}
export const updateData = (setOptions:Dispatch<SetStateAction<ParamOption[]>>, setUnfiltered:Dispatch<SetStateAction<ParamOption[]>>, fetchedOptions:any) =>{
    setOptions(fetchedOptions.props.data);
    setUnfiltered(fetchedOptions.props.data);
}