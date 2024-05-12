"use client";
import { ParamDepartment } from "@/types";
import { Success, Error } from "../../../notifications/alerts";
import {fetchDepartment} from "../../../actions/actions_departments/actions";
import { Dispatch, SetStateAction } from "react";

export const param: ParamDepartment = {
    id: "",
    name: "",
    description: "",
    unit: "",

};
export const filtered = (unfiltered:ParamDepartment[], filters:Partial<ParamDepartment>) =>{
    const filteredDepartments = unfiltered.filter(item => {
        return Object.keys(filters).every(key => {
            const filterValue = filters[key as keyof ParamDepartment];
            const itemValue = item[key as keyof ParamDepartment];
            if (typeof filterValue === 'number' || typeof itemValue === 'number') {
                const stringValue = String(filterValue).toLowerCase();
                const itemStringValue = String(itemValue).toLowerCase();
                return itemStringValue.includes(stringValue);
            } else {
                return itemValue.toLowerCase().includes((filterValue || "").toLowerCase());
            }
        });
    });
    return filteredDepartments;
}

export const stateDeleted = async (deletionResult:boolean, setDepartments:Dispatch<SetStateAction<ParamDepartment[]>>, setUnfiltered:Dispatch<SetStateAction<ParamDepartment[]>> ) => {
    if (deletionResult) {
        Success('Departamento eliminado correctamente')
        const fetchedSections = await fetchDepartment(param);
        updateData(setDepartments,setUnfiltered,fetchedSections);
    } else {
        Error('Error al intentar eliminar el departamento');
    }
}
export const updateData = (setDepartments:Dispatch<SetStateAction<ParamDepartment[]>>, setUnfiltered:Dispatch<SetStateAction<ParamDepartment[]>>, fetchedSections:any) =>{
    setDepartments(fetchedSections.props.data);
    setUnfiltered(fetchedSections.props.data);
}