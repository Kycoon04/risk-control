"use client";
import { postForm} from '@/app/components/actions/actions_forms/actions'
import { Error,Success } from '@/app/components/notifications/alerts';
import {Form,Section} from '@/types';

export const submitForms = async (id: string, name:string, state:string, inicialperiod:Date, finalperiod:Date,complete:string) => {
    try {
        if(inicialperiod<finalperiod){
            const newState = state === 'Activo' ? '1' : '0';
            const newForm:Form={id: id, name:name, state:newState, inicialperiod: inicialperiod.toISOString().split('T')[0], finalperiod:finalperiod.toISOString().split('T')[0],complete:complete}
            const form = await postForm(newForm);
            Success('Formulario registrado');
        } else {
          console.log('Error de registro');
          Error("Error de registro");
        }
      } catch (error) {
        console.error('Error:', error);
        Error("Error de registro");
      }
}