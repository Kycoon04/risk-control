"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Field from '@/app/components/utils_forms/Field';
import Field_Disabled from '@/app/components/utils_forms/Field_Disabled';
import Text_Area from '@/app/components/utils_forms/Text_Area';
import Standard_button from '@/app/components/utils_forms/Button';
import { makeChange } from '@/lib/auth';
import { putUpdateSection} from '@/app/components/actions/actions_sections/actions'
import { Error,Success } from '@/app/components/notifications/alerts';
import {fetchForms } from '@/app/components/actions/actions_forms/actions';
import { useAuthStore } from '@/app/components/maintenance/maintenance_storages/section_storage';
import ChoiseBox_States from '@/app/components/utils_forms/ChoiseBox_States';
import ChoiseBox from '@/app/components/register/selectDepart';
import {Form,Section} from '@/types';
import { Truculenta } from 'next/font/google';
const Section_Form: React.FC = () => {
     const Section = useAuthStore(state => state.section);
    const [loading, setLoading] = useState(true);
    const [id,setId]=useState(Section?.id);
    const [name, setName] = useState(Section?.name);
    const [description, setDescription] = useState(Section?.description);
    const [form, setForm] = useState(Section.forms);
    const [forms, setForms] = useState<Form[]>([]);
    const [complete, setComplete] = useState(Section?.complete);
    const [states, setStates] = useState<string[]>(['Completado', 'Sin Completar']);
    const { handleSubmit, register, formState: { errors } } = makeChange();
    useEffect(() => {
        if (Section) {
            setLoading(false);
        }
    }, [Section]);
    useEffect(() => {
        const initialize = async () => {
            const fetchedForms = await fetchForms();
            setForms(fetchedForms.props.data);

        };
        initialize();
    }, []);
    const submitForm = async () => {
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
    const comeBack = async () => { }
    return (
        <>
        <div className=' py-5 drop-shadow-lg m-1 flex flex-col items-center pr-7 pl-7' >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4 w-full">
                <Field_Disabled text_Field={id} setText_Field={setId} titule={'Id:'} type={"text"} register={register} error={errors.id} name={"id"}></Field_Disabled>
                <Field text_Field={name} setText_Field={setName} titule={'Nombre:'} type={"text"} register={register} error={errors.name} name={"name"}></Field>
                <ChoiseBox_States data={states} selectData={complete} onChange={setComplete} titule="Estado:"/>
                <ChoiseBox data={forms} selectData={form} onChange={setForm} titule="Formulario:"/>
                <Text_Area text_Field={description} setText_Field={setDescription} titule={'Descripción:'} type={"text"} register={register} error={errors.description} name={"description"}></Text_Area>
            </div>
            <div className='grid grid-cols-2 md:grid-cols-2 gap-8 justify-center'>
                <div className='flex justify-center'>
                    <Link href={'/home_page/maintenance/mainte_sections/'}>
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
export default Section_Form;