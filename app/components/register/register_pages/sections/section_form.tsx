"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Field from '@/app/components/utils_forms/Field';
import Text_Area from '@/app/components/utils_forms/Text_Area';
import Standard_button from '@/app/components/utils_forms/Button';
import { makeValidationLoad } from '@/lib/validation/makeValidationLoad';
import { Error,Success } from '@/app/components/notifications/alerts';
import {fetchForms } from '@/app/components/actions/actions_forms/actions';
import ChoiseBox from '@/app/components/register/selectDepart';
import {Form,Section} from '@/types';
import {submitFormSections} from '../sections/register_methods'
import {useRouter} from 'next/navigation';
import { param} from '../../../maintenance/maintenance_pages/methods_pages/forms_methods'
const Section_Form: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [form, setForm] = useState('1');
    const [forms, setForms] = useState<Form[]>([]);
    const [complete, setComplete] = useState('Sin completar');
    const { handleSubmit, register, formState: { errors } } = makeValidationLoad();
    const router = useRouter();
    useEffect(() => {
        const initialize = async () => {
            const fetchedForms = await fetchForms(param);
            setForms(fetchedForms.props.data);
        };
        initialize();
    }, []);
    const submitForm = async () => {
        await submitFormSections(name,description,form,complete).then(()=>router.push('/home_page/maintenance/mainte_sections/'));
    }
    const comeBack = async () => { }
    return (
        <>
        <div className=' py-5 drop-shadow-lg m-1 flex flex-col items-center pr-7 pl-7' >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4 w-full">
                <Field text_Field={name} setText_Field={setName} titule={'Nombre:'} type={"text"} register={register} error={errors.name} name={"name"}></Field>
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