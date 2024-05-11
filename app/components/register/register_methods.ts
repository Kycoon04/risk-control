"use client";
import { postUser} from '../actions/actions_users/actions'
import { Error,Success } from '../notifications/alerts';
import {fetchRoleAll,postRoleXUser } from '../actions/actions_roles/actions';
import {ParamDepartment,Role, User} from '@/types';
export const Departments: ParamDepartment = {
    id: "",
    name: "",
    description: "",
    unit: ""
}
export const submitFormUser = async (departmentId:string,name:string, second_name:string, surname:string, second_surname:string, email:string, identification:string, nickname:string, phone_number:string,rolesId:string) => {
    const paramUser: User={id:'0',name:name, second_name:second_name, surname:surname, second_surname:second_surname, email:email, identification:identification, nickname:nickname, phone_number:phone_number,department:departmentId}
    const user = await postUser(paramUser);
    const data = await user?.json();
    if (true) {
        const departments = {
            id: "",
            user: data.id,
            role: rolesId
        }
        await postRoleXUser(departments);
        Success('Usuario registrado');
    } else {
        console.log('Error de registro')
        Error("Error de registro");
    }
}