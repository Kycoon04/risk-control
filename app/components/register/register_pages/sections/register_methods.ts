"use client";
import { postSection} from '@/app/components/actions/actions_sections/actions'
import { Error,Success } from '@/app/components/notifications/alerts';

export const submitFormSections = async (name:string,description:string,form:string,complete:string) => {
    try {
        const section = await postSection(name,description,form,complete);
        if (true) {
          Success('Seccion registrada');
        } else {
          console.log('Error de registro');
          Error("Error de registro");
        }
      } catch (error) {
        console.error('Error:', error);
        Error("Error de registro");
      }
}