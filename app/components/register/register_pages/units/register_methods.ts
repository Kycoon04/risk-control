"use client";
import { postUnit} from '@/app/components/actions/actions_units/actions'
import { Error,Success } from '@/app/components/notifications/alerts';

export const submitFormUnits = async (name:string, description:string) => {
    try {
        const unit = await postUnit( name, description);
        if (true) {
          Success('Unidad registrada');
        } else {
          console.log('Error de registro');
          Error("Error de registro");
        }
      } catch (error) {
        console.error('Error:', error);
        Error("Error de registro");
      }
}