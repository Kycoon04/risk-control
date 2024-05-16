"use client";
import { postUpdateOption } from '@/app/components/actions/actions_options/actions';
import { Error,Success } from '@/app/components/notifications/alerts';
import { ParamQuestions } from '@/types';

export const Questions: ParamQuestions = {
    id: "",
    question: "",
    description: "",
    section: "",
};
export const comeBack = async () => { }
export const submitFormOption = async (id:string, option:string, question:string,score:string) => {
    console.log(id+" "+option+" "+question+" "+score);
    try {
        const pOption = await postUpdateOption(id, option, question,score);
        if (true) {
          Success('Opción de pregunta actualizado');
        } else {
          console.log('Error de registro');
          Error("Error de registro");
        }
      } catch (error) {
        console.error('Error:', error);
        Error("Error de registro");
      }
}