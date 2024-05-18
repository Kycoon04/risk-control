"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Field from '@/app/components/utils_forms/Field';
import Field_Disabled from '@/app/components/utils_forms/Field_Disabled';
import Text_Area from '@/app/components/utils_forms/Text_Area';
import Standard_button from '@/app/components/utils_forms/Button';
import { makeChange } from '@/lib/validation/makeChange';
import { useAuthStore } from '@/app/components/maintenance/maintenance_storages/unit_storage';
import {submitFormUnits,comeBack} from '../units/maintenance_methods';

const Unit_Form: React.FC = () => {
     const Unit = useAuthStore(state => state.unit);
    const [loading, setLoading] = useState(true);
    const [id,setId]=useState(Unit?.id);
    const [name, setName] = useState(Unit?.name);
    const [description, setDescription] = useState(Unit?.description);

    const { handleSubmit, register, formState: { errors } } = makeChange();
    useEffect(() => {
        if (Unit) {
            setLoading(false);
        }
    }, [Unit]);
    const submitForm = async () => {
        submitFormUnits(id, name, description);
    }
    return (
        <>
        <div className=' py-5 drop-shadow-lg m-1 flex flex-col items-center pr-7 pl-7' >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4 w-full">
                <Field_Disabled text_Field={id} setText_Field={setId} titule={'Id:'} type={"text"} register={register} error={errors.id} name={"id"}></Field_Disabled>
                <Field text_Field={name} setText_Field={setName} titule={'Nombre:'} type={"text"} register={register} error={errors.name} name={"name"}></Field>
                <Text_Area text_Field={description} setText_Field={setDescription} titule={'Descripción:'} type={"text"} register={register} error={errors.description} name={"description"}></Text_Area>
            </div>
            <div className='grid grid-cols-2 md:grid-cols-2 gap-8 justify-center'>
                <div className='flex justify-center'>
                    <Link href={'/home_page/maintenance/mainte_units/'}>
                        <Standard_button fuction={comeBack} titule={"Regresar"} width={"350px"}></Standard_button>
                    </Link>
                </div>
                <div className='flex justify-center'>
                    <Link href={'/home_page/maintenance/mainte_units/'}>
                        <Standard_button fuction={handleSubmit(submitForm)} titule={"Guardar"} width={"350px"}></Standard_button>
                    </Link>
                </div>
            </div>
        </div>
        </>
    );
}
export default Unit_Form;