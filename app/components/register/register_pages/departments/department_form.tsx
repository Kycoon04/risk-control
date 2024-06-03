"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Field from '@/app/components/utils_forms/Field';
import Text_Area from '@/app/components/utils_forms/Text_Area';
import Standard_button from '@/app/components/utils_forms/Button';
import { makeValidationLoad } from '@/lib/validation/makeValidationLoad';
import { fetchUnit} from '@/app/components/actions/actions_units/actions'
import { ParamUnit } from '@/types';
import ChoiseBox from '@/app/components/register/selectDepart';
import {submitFormDepartment,Units} from '../departments/register_methods'
import {useRouter} from 'next/navigation';
const Department_Form: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [id,setId]=useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [units, setUnits] = useState<ParamUnit[]>([]);
    const [unit, setUnit] = useState("1");
    const { handleSubmit, register, formState: { errors } } = makeValidationLoad();
    const router = useRouter();
    useEffect(() => {
        const initialize = async () => {
            const fetchedSections = await fetchUnit(Units);
            setUnits(fetchedSections.props.data);
        };
        initialize();
    }, []);
    const submitForm = async () => {
        await submitFormDepartment( name, description,unit).then(()=>router.push('/home_page/maintenance/mainte_depart/'));
    }
    const comeBack = async () => { }
    return (
        <>
        <div className=' py-5 drop-shadow-lg m-1 flex flex-col items-center pr-7 pl-7' >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4 w-full">
                <Field text_Field={name} setText_Field={setName} titule={'Nombre:'} type={"text"} register={register} error={errors.name} name={"name"}></Field>
                <Text_Area text_Field={description} setText_Field={setDescription} titule={'Descripción:'} type={"text"} register={register} error={errors.description} name={"description"}></Text_Area>
                <ChoiseBox data={units} selectData={unit} onChange={setUnit} titule="Unidades:"/>
            </div>
            <div className='grid grid-cols-2 md:grid-cols-2 gap-8 justify-center'>
                <div className='flex justify-center'>
                    <Link href={'/home_page/maintenance/mainte_depart/'}>
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
export default Department_Form;