"use client";
import { postUpdateUnit} from '@/app/components/actions/actions_units/actions'
import { Error,Success } from '@/app/components/notifications/alerts';
export const comeBack = async () => { }
export const submitFormUnits = async (id:string, name:string, description:string) => {
    try {
        const unit = await postUpdateUnit(id, name, description);
        if (true) {
          Success('Unidad actualizada');
        } else {
          console.log('Error de registro');
          Error("Error de registro");
        }
      } catch (error) {
        console.error('Error:', error);
        Error("Error de registro");
      }
}