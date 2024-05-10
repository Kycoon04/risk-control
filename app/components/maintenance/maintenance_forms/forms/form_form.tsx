"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import DatePicker from "@/app/components/utils_forms/DatePicker"
import Field from '@/app/components/utils_forms/Field';
import Field_Disabled from '@/app/components/utils_forms/Field_Disabled';
import Text_Area from '@/app/components/utils_forms/Text_Area';
import Standard_button from '@/app/components/utils_forms/Button';
import { changeState } from '@/lib/validation/changeState';
import { putForms} from '@/app/components/actions/actions_forms/actions'
import { Error,Success } from '@/app/components/notifications/alerts';
import {fetchForms } from '@/app/components/actions/actions_forms/actions';
import { useAuthStore } from '@/app/components/maintenance/maintenance_storages/form_storage';
import ChoiseBox_States from '@/app/components/utils_forms/ChoiseBox_States';
import ChoiseBox from '@/app/components/register/selectDepart';
import {Form,Section} from '@/types';
import { Truculenta } from 'next/font/google';


const Form_Form: React.FC = () => {
     const Form = useAuthStore(state => state.form);
    const [loading, setLoading] = useState(true);
    const [id,setId]=useState(Form?.id);
    const [name, setName] = useState(Form?.name);
    const [state, setState] = useState(Form?.state);
    const [states, setStates] = useState<string[]>(['Activo', 'Inactivo']);
    const [inicialperiod, setInicialperiod] = useState<Date>(new Date());
    const [finalperiod, setFinalperiod] = useState<Date>(new Date());
    const [complete, setComplete] = useState(Form?.complete);
    const [completes, setCompletes] = useState<string[]>(['Completado', 'Sin Completar']);
    const { handleSubmit, register, formState: { errors } } = changeState();

    useEffect(() => {
        if (Form) {
            setLoading(false);
        }
        const State = Form.state == '1' ? 'Activo' : 'Inactivo';
        setState(State);
    }, [Form]);
    useEffect(() => {
        if (Form?.inicialperiod) {
            setInicialperiod(new Date(Form.inicialperiod));
        }
        if (Form?.finalperiod) {
            setFinalperiod(new Date(Form.finalperiod));
        }
    }, [Form]);
    const submitForm = async () => {
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
    const comeBack = async () => { }
    return (
        <>
        <div className=' py-5 drop-shadow-lg m-1 flex flex-col items-center pr-7 pl-7' >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4 w-full">
                <Field_Disabled text_Field={id} setText_Field={setId} titule={'Id:'} type={"text"} register={register} error={errors.id} name={"id"}></Field_Disabled>
                <Field text_Field={name} setText_Field={setName} titule={'Nombre:'} type={"text"} register={register} error={errors.name} name={"name"}></Field>
                <ChoiseBox_States data={completes} selectData={complete} onChange={setComplete} titule="Condición:"/>
                <ChoiseBox_States data={states} selectData={state} onChange={setState} titule="Estado:"/>
                <DatePicker value={inicialperiod} setText_Field={setInicialperiod} titule={"Inicio de aplicación"} />
                <DatePicker value={finalperiod} setText_Field={setFinalperiod} titule={"Final de aplicación"} />
            </div>
            <div className='grid grid-cols-2 md:grid-cols-2 gap-8 justify-center'>
                <div className='flex justify-center'>
                    <Link href={'/home_page/maintenance/mainte_forms/'}>
                        <Standard_button fuction={comeBack} titule={"Regresar"} width={"350px"}></Standard_button>
                    </Link>
                </div>
                <div className='flex justify-center'>
                    <Standard_button fuction={handleSubmit(submitForm)} titule={"Guardar"} width={"350px"}></Standard_button>
                </div>
            </div>
        </div>
    </>
    );
}
export default Form_Form;