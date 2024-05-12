"use client";
import { Error,Success } from '@/app/components/notifications/alerts';
import { ParamSection } from '@/types';
import { postQuestion } from '@/app/components/actions/actions_questions/actions';

export const Sections: ParamSection = {
    id: "",
    name: "",
    description: "",
    forms: "",
    complete:"",
}
export const submitFormQuestion = async (question:string, description:string,section:string) => {
    try {
        const anQuestion = await postQuestion(question, description,section);
        if (true) {
          Success('Pregunta registrada');
        } else {
          console.log('Error de registro');
          Error("Error de registro");
        }
      } catch (error) {
        console.error('Error:', error);
        Error("Error de registro");
      }
}