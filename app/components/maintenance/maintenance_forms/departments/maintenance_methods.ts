"use client";
import { postUpdateDepartment } from '@/app/components/actions/actions_departments/actions';
import { Error,Success } from '@/app/components/notifications/alerts';
import { ParamUnit } from '@/types';

export const Units: ParamUnit = {
    id: "",
    name: "",
    description: "",
}
export const comeBack = async () => { }
export const submitFormDepartment = async (id:string, name:string, description:string,unit:string) => {
    try {
        const department = await postUpdateDepartment(id, name, description,unit);
        if (true) {
          Success('Departamento actualizado');
        } else {
          console.log('Error de registro');
          Error("Error de registro");
        }
      } catch (error) {
        console.error('Error:', error);
        Error("Error de registro");
      }
}