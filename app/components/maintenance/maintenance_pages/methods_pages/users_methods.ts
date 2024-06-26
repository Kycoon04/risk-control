"use client";
import { RoleXUser, User,UserFecth } from "@/types";
import { fetchUsers } from "../../../actions/actions_users/actions";
import { Success, Error } from "../../../notifications/alerts";
import { Dispatch, SetStateAction } from "react";
export const param: User = {
        id: "",
        department: "",
        name: "",
        second_name: "",
        surname: "",
        second_surname: "",
        email: "",
        identification: "",
        nickname: "",
        phone_number: ""
};
export const params: UserFecth = {
    id: "",
    department: "",
    name: "",
    second_name: "",
    surname: "",
    second_surname: "",
    email: "",
    identification: "",
    nickname: "",
    phone_number: "",
    page: 1,
    limit: 4,
};
export const filtered = (unfiltered:User[],filters:Partial<User>) => {
    const filteredLoggers = unfiltered.filter(item => {
        return Object.keys(filters).every(key => {
            const filterValue = filters[key as keyof User];
            const itemValue = item[key as keyof User];

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
export const stateDeleted = async (deletionResult:boolean,setUsers:Dispatch<SetStateAction<User[]>>,setUnfiltered: Dispatch<SetStateAction<User[]>>,setCount: Dispatch<SetStateAction<number>>) => {
    if (deletionResult) {
        Success('Usuario eliminado correctamente')
        const fetchedSections = await fetchUsers(params);
        updateData(setUsers,setUnfiltered,fetchedSections,setCount);
    } else {
        Error('Error al intentar eliminar el usuario');
    }
}
export const updateData = (setUsers:Dispatch<SetStateAction<User[]>>,setUnfiltered: Dispatch<SetStateAction<User[]>>,fetchedSections:any,setCount: Dispatch<SetStateAction<number>>) => {
    setUsers(fetchedSections.props.data);
    setUnfiltered(fetchedSections.props.data);
    setCount(fetchedSections.props.pagination.totalRecords);
}