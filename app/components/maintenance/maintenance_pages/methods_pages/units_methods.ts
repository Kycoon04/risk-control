"use client";
import {ParamUnit,ParamUnitFetch} from "@/types";
import {fetchUnit, deleteUnit} from "../../../actions/actions_units/actions";
import { Success, Error } from "../../../notifications/alerts";
import { Dispatch, SetStateAction } from "react";

export const param: ParamUnit = {
        id: "",
        name: "",
        description: "",
};
export const params: ParamUnitFetch = {
    id: "",
    name: "",
    description: "",
    page: 1,
    limit: 4,
};
export const filtered = (unfiltered:ParamUnit[],filters:Partial<ParamUnit>) => {
    const filteredUnits = unfiltered.filter(item => {
        return Object.keys(filters).every(key => {
            const filterValue = filters[key as keyof ParamUnit];
            const itemValue = item[key as keyof ParamUnit];

            if (typeof filterValue === 'number' || typeof itemValue === 'number') {
                const stringValue = String(filterValue).toLowerCase();
                const itemStringValue = String(itemValue).toLowerCase();
                return itemStringValue.includes(stringValue);
            } else {
                return itemValue.toLowerCase().includes((filterValue || "").toLowerCase());
            }
        });
    });
    return filteredUnits;
}
export const stateDeleted = async (deletionResult:boolean, setUnits:Dispatch<SetStateAction<ParamUnit[]>>,setUnfiltered:Dispatch<SetStateAction<ParamUnit[]>>,setCount: Dispatch<SetStateAction<number>>) =>{
    if (deletionResult) {
        Success('Unidad eliminada correctamente')
        const fetchedSections = await fetchUnit(params);
        updateData(setUnits,setUnfiltered, fetchedSections,setCount);
    } else {
        Error('Error al intentar eliminar la unidad');
    }
}
export const updateData = (setUnits:Dispatch<SetStateAction<ParamUnit[]>>,setUnfiltered:Dispatch<SetStateAction<ParamUnit[]>>,fetchedSections:any,setCount: Dispatch<SetStateAction<number>>) => {
    setUnits(fetchedSections.props.data);
    setUnfiltered(fetchedSections.props.data);
    setCount(fetchedSections.props.pagination.totalRecords);
}