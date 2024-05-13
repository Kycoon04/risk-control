"use client";
import { Role,RoleXUser,roleSelected,User } from "@/types";
import {fetchRoleAll} from "../../../actions/actions_roles/actions";
import { fetchRoleXIdUser} from '@/app/components/actions/actions_rolesxuser/actions';
import { Success, Error } from "../../../notifications/alerts";
import { Dispatch, SetStateAction } from "react";
export const param: Role = { id: "", name: "", active: "" };
export const loadData = (setRoles:Dispatch<SetStateAction<Role[]>>,setUnfiltered:Dispatch<SetStateAction<Role[]>>,setRoleXUser:Dispatch<SetStateAction<RoleXUser[]>>,user:User,setIsLoading:Dispatch<SetStateAction<boolean>>) =>{
    setIsLoading(true);
    updateData(setRoles,setUnfiltered,setRoleXUser,user);
    setIsLoading(false);
}
export const importList = (roleXUser: RoleXUser[], roles: Role[]): roleSelected[] => {
        const list: roleSelected[] = [];
            for (let i = 0; i < roles.length; i++) {
                const isRoleSelected = roleXUser.some(rolUser => rolUser.role === roles[i].id);
                list.push({ role: roles[i], state: isRoleSelected ? "Agregado" : "No Agregado", });
            }
        return list;
}
export const filtered  = (unfiltered:Role[],filters:Partial<Role>) => {
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
export const stateDeleted = async (deletionResult:boolean,setRoles:Dispatch<SetStateAction<Role[]>>,setUnfiltered:Dispatch<SetStateAction<Role[]>>,setRoleXUser:Dispatch<SetStateAction<RoleXUser[]>>,user:User) => {
    if (deletionResult) {
        Success('Rol eliminado correctamente')
        updateData(setRoles,setUnfiltered,setRoleXUser,user);
    } else {
        Error('Error al intentar eliminar el rol');
    }
}
export const stateAdded = async (AddedResult:boolean,setRoles:Dispatch<SetStateAction<Role[]>>,setUnfiltered:Dispatch<SetStateAction<Role[]>>,setRoleXUser:Dispatch<SetStateAction<RoleXUser[]>>,user:User) => {
    if (AddedResult) {
        Success('Rol agregado correctamente')
        updateData(setRoles,setUnfiltered,setRoleXUser,user);
    } else {
        Error('Error al intentar agregar el rol');
    }
}
export const updateData = async (setRoles:Dispatch<SetStateAction<Role[]>>,setUnfiltered:Dispatch<SetStateAction<Role[]>>,setRoleXUser:Dispatch<SetStateAction<RoleXUser[]>>,user:User) => {
    const fetchedSections = await fetchRoleAll();
    setRoles(fetchedSections.props.data);
    setUnfiltered(fetchedSections.props.data);
    const fetchedDepartXForm = await fetchRoleXIdUser(user.id);
    setRoleXUser(fetchedDepartXForm);
}