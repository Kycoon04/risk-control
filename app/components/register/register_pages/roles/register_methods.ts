"use client";
import { postRole} from '@/app/components/actions/actions_roles/actions'
import { Error,Success } from '@/app/components/notifications/alerts';

export const submitFormRoles = async (name:string,stateId:string) => {
    try {
        const newActive = stateId === 'Activo' ? '1' : '0';
        const role = await postRole(name,newActive);
        if (true) {
          Success('Rol registrado');
        } else {
          console.log('Error de registro');
          Error("Error de registro");
        }
      } catch (error) {
        console.error('Error:', error);
        Error("Error de registro");
      }
}