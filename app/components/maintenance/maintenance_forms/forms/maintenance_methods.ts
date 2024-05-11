"use client";
import { Error,Success } from '@/app/components/notifications/alerts';
import { putForms} from '@/app/components/actions/actions_forms/actions'
import {Form,Section} from '@/types';

export const comeBack = async () => { }
export const submitForms = async (id: string, name:string, state:string, inicialperiod: Date, finalperiod:Date,complete:string) => {
    try {
        const newState = state === 'Activo' ? '1' : '0';
        const newForm:Form={id: id, name:name, state:newState, inicialperiod: inicialperiod.toISOString().split('T')[0], finalperiod:finalperiod.toISOString().split('T')[0],complete:complete}
        const form = await putForms(newForm);
        if (true) {
          Success('Formulario actualizado');
        } else {
          console.log('Error de registro');
          Error("Error de registro");
        }
      } catch (error) {
        console.error('Error:', error);
        Error("Error de registro");
      }
}