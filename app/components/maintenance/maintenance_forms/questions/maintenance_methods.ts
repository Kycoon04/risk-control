import { postUpdateQuestion } from '@/app/components/actions/actions_questions/actions';
import { Error,Success } from '@/app/components/notifications/alerts';
import { ParamSection } from '@/types';

export const Sections: ParamSection = {
    id: "",
    name: "",
    description: "",
    forms: "",
    complete:"",
}
export const comeBack = async () => { }
export const submitFormQuestion = async (id:string, question:string, description:string,section:string) => {
    try {
        const anQuestion = await postUpdateQuestion(id, question, description,section);
        if (true) {
          Success('Pregunta actualizada');
        } else {
          console.log('Error de registro');
          Error("Error de registro");
        }
      } catch (error) {
        console.error('Error:', error);
        Error("Error de registro");
      }
}