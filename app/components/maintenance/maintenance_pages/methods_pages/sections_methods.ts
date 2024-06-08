"use client";
import { Section,SectionFetch } from "@/types";
import { fetchSections } from "../../../actions/actions_sections/actions";
import { Success,Error } from "../../../notifications/alerts";
import { Dispatch, SetStateAction } from "react";

export const param: Section = {
    id: "",
    name: "",
    description: "",
    forms: "",
    complete:"",
};
export const params: SectionFetch = {
    id: "",
    name: "",
    description: "",
    forms: "",
    complete:"",
    page: 1,
    limit: 4,
};

export const filtered = (unfiltered:Section[],filters:Partial<Section>)=>{
    const filteredLoggers = unfiltered.filter(item => {
        return Object.keys(filters).every(key => {
            const filterValue = filters[key as keyof Section];
            const itemValue = item[key as keyof Section];
            if (typeof filterValue === 'number' || typeof itemValue === 'number') {
                const stringValue = String(filterValue).toLowerCase();
                const itemStringValue = String(itemValue).toLowerCase();
                return itemStringValue.includes(stringValue);
            } else {
                return itemValue.toLowerCase().includes((filterValue || "").toLowerCase());
            }
        });
    });
    return filteredLoggers;
}

export const stateDeleted = async (deletionResult:boolean, setSections:Dispatch<SetStateAction<Section[]>>,setUnfiltered:Dispatch<SetStateAction<Section[]>>,setCount: Dispatch<SetStateAction<number>>) => {
    if (deletionResult) {
        Success('Sección eliminado correctamente')
        const fetchedSections = await fetchSections(params);
        updateData(setSections,setUnfiltered,fetchedSections,setCount);
    } else {
        Error('Error al intentar eliminar el sección');
    }
}
export const updateData = (setSections:Dispatch<SetStateAction<Section[]>>,setUnfiltered:Dispatch<SetStateAction<Section[]>>,fetchedSections:any,setCount: Dispatch<SetStateAction<number>>)=>{
    setSections(fetchedSections.props.data);
    setUnfiltered(fetchedSections.props.data);
    setCount(fetchedSections.props.pagination.totalRecords);
}
