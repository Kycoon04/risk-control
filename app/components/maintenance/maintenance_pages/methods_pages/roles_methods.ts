"use client";
import { Success, Error } from "../../../notifications/alerts";
import {Role,RoleFecht} from "@/types";
import {fetchRoleAll} from "../../../actions/actions_roles/actions";
import { Dispatch, SetStateAction } from "react";
export const param: Role = {
    id: "",
    name: "",
    active: "",
};
export const params: RoleFecht = {
    id: "",
    name: "",
    active: "",
    page: 1,
    limit: 4,
};
export const filtered = (unfiltered: Role[],filters:Partial<Role>) => {
    const filteredRoles = unfiltered.filter(item => {
        return Object.keys(filters).every(key => {
            const filterValue = filters[key as keyof Role];
            const itemValue = item[key as keyof Role];

            if (typeof filterValue === 'number' || typeof itemValue === 'number') {
                const stringValue = String(filterValue).toLowerCase();
                const itemStringValue = String(itemValue).toLowerCase();
                return itemStringValue.includes(stringValue);
            } else {
                return itemValue.toLowerCase().includes((filterValue || "").toLowerCase());
            }
        });
    });
    return filteredRoles;
}

export const stateDeleted = async (deletionResult:boolean,setRoles:Dispatch<SetStateAction<Role[]>>,setUnfiltered:Dispatch<SetStateAction<Role[]>>,setCount: Dispatch<SetStateAction<number>>) =>  {
    if (deletionResult) {
        Success('Role eliminado correctamente')
        const fetchedSections = await fetchRoleAll(params);
        updateData(setRoles,setUnfiltered,fetchedSections,setCount);
    } else {
        Error('Error al intentar eliminar la unidad');
    }
}
export const updateData = (setRoles:Dispatch<SetStateAction<Role[]>>,setUnfiltered:Dispatch<SetStateAction<Role[]>>,fetchedSections:any,setCount: Dispatch<SetStateAction<number>>) =>{
    setRoles(fetchedSections.props.data);
    setUnfiltered(fetchedSections.props.data);
    setCount(fetchedSections.props.pagination.totalRecords);
}