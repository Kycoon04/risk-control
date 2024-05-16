"use client";
import { postOption } from '@/app/components/actions/actions_options/actions';
import { Error,Success } from '@/app/components/notifications/alerts';
import { ParamQuestions } from '@/types';
export const Questions: ParamQuestions = {
    id: "",
    question: "",
    description: "",
    section: "",
};
export const submitFormOption = async (option:string, question:string,score:string) => {
    try {
        await postOption( option, question,score);
        if (true) {
          Success('Opció de Pregunta registrada');
        } else {
          console.log('Error de registro');
          Error("Error de registro");
        }
      } catch (error) {
        console.error('Error:', error);
        Error("Error de registro");
      }
}