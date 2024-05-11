"use client";
import { postUpdateUser} from '@/app/components/actions/actions_users/actions'
import { Error,Success } from '@/app/components/notifications/alerts';
import {putRoleXUser } from '@/app/components/actions/actions_roles/actions';
import {ParamDepartment,RoleXUser} from '@/types';
export const Departments: ParamDepartment = {
    id: "",
    name: "",
    description: "",
    unit: ""
}
export const comeBack = async () => {}
export const submitFormUser = async (id:string,departmentId:string, name:string, second_name:string, surname:string, second_surname:string, email:string, identification:string, nickname:string, phone_number:string,rolesId:string, role:RoleXUser) => {
        
    const user = await postUpdateUser(id,departmentId, name, second_name, surname, second_surname, email, identification, nickname, phone_number);
    const data = await user?.json();
    if (true) {
        const departments = {
            id: role.id,
            user: id,
            role: rolesId
        }
        await putRoleXUser(departments);
        Success('Usuario actualizado');
    } else {
        console.log('Error de registro')
        Error("Error de registro");
    }
}