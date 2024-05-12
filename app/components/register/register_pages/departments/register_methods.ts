"use client";
import { postDepartment } from '@/app/components/actions/actions_departments/actions';
import { Error,Success } from '@/app/components/notifications/alerts';
import { ParamUnit } from '@/types';
export const Units: ParamUnit = {
    id: "",
    name: "",
    description: "",
}
export const submitFormDepartment = async (name:string, description:string,unit:string) => {
    try {
        await postDepartment( name, description,unit);
        if (true) {
          Success('Departamento registrado');
        } else {
          console.log('Error de registro');
          Error("Error de registro");
        }
      } catch (error) {
        console.error('Error:', error);
        Error("Error de registro");
      }
}