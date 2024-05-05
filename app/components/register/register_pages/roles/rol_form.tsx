"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Field from '@/app/components/utils_forms/Field';
import Standard_button from '@/app/components/utils_forms/Button';
import { changeStateLoad } from '@/validationSchema/auth';
import { postRole} from '@/app/components/actions/actions_roles/actions'
import { Error,Success } from '@/app/components/notifications/alerts';
import ChoiseBox_States from '@/app/components/utils_forms/ChoiseBox_States';
import { Truculenta } from 'next/font/google';
const Rol_Form: React.FC = () => {
    const [name, setName] = useState("");
    const [states, setStates] = useState<string[]>(['Activo', 'Inactivo']);
    const [stateId, setStateId] = useState('1');
    const { handleSubmit, register, formState: { errors } } = changeStateLoad();

    const submitForm = async () => {
        try {
            const newActive = stateId === 'Activo' ? '1' : '0';
            const role = await postRole(name,newActive);
            if (true) {
              Success('Rol registrado');
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
        <div className=' py-5 drop-shadow-lg m-1 flex flex-col items-center pr-7 pl-7' >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4 w-full">
                <Field text_Field={name} setText_Field={setName} titule={'Nombre:'} type={"text"} register={register} error={errors.name} name={"name"}></Field>
                <ChoiseBox_States data={states} selectData={stateId} onChange={setStateId} titule="Estado:"/>
            </div>
            <div className='grid grid-cols-2 md:grid-cols-2 gap-8 justify-center'>
                <div className='flex justify-center'>
                    <Link href={'/home_page/maintenance/mainte_roles/'}>
                        <Standard_button fuction={comeBack} titule={"Regresar"} width={"350px"}></Standard_button>
                    </Link>
                </div>
                <div className='flex justify-center'>
                    <Standard_button fuction={handleSubmit(submitForm)} titule={"Guardar"} width={"350px"}></Standard_button>
                </div>
            </div>
        </div>
    );
}
export default Rol_Form;