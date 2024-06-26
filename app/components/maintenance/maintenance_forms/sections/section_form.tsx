"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Field from '@/app/components/utils_forms/Field';
import Field_Disabled from '@/app/components/utils_forms/Field_Disabled';
import Text_Area from '@/app/components/utils_forms/Text_Area';
import Standard_button from '@/app/components/utils_forms/Button';
import { makeChange } from '@/lib/validation/makeChange';
import {fetchForms } from '@/app/components/actions/actions_forms/actions';
import { useAuthStore } from '@/app/components/maintenance/maintenance_storages/section_storage';
import ChoiseBox_States from '@/app/components/utils_forms/ChoiseBox_States';
import ChoiseBox from '@/app/components/register/selectDepart';
import {Form,Section} from '@/types';
import {submitFormSections, comeBack} from '../sections/maintenance_methods';
import { param,} from '../../maintenance_pages/methods_pages/forms_methods'
import {useRouter} from 'next/navigation';
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
    const router = useRouter();
    useEffect(() => {
        if (Section) { setLoading(false); }
    }, [Section]);
    useEffect(() => {
        const initialize = async () => {
            const fetchedForms = await fetchForms(param);
            setForms(fetchedForms.props.data);
        }; initialize();
    }, []);
    const submitForm = async () => {await submitFormSections(id, name, description,form,complete).then(()=>router.push('/home_page/maintenance/mainte_sections/')); }
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