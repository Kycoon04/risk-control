import { putUpdateSection} from '@/app/components/actions/actions_sections/actions'
import { Error,Success } from '@/app/components/notifications/alerts';
import {Section} from '@/types';

export const comeBack = async () => { }
export const submitFormSections = async (id:string, name:string, description:string,form:string,complete:string) => {
    try {
        const newSection:Section={id: id, name:name, description:description,forms:form,complete:complete}
        const section = await putUpdateSection(newSection);
        if (true) {
          Success('Seccion actualizada');
        } else {
          console.log('Error de registro');
          Error("Error de registro");
        }
      } catch (error) {
        console.error('Error:', error);
        Error("Error de registro");
      }
}