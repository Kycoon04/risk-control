"use client";
import { postUpdateRole} from '@/app/components/actions/actions_roles/actions'
import { Error,Success } from '@/app/components/notifications/alerts';

export const comeBack = async () => { }
export const submitFormRoles = async (id:string, name:string,stateId:string) => {
    try {
        const newActive = stateId === 'Activo' ? '1' : '0';
        const role = await postUpdateRole(id, name,newActive);
        if (true) {
          Success('Rol actualizado');
        } else {
          console.log('Error de registro');
          Error("Error de registro");
        }
      } catch (error) {
        console.error('Error:', error);
        Error("Error de registro");
      }
}