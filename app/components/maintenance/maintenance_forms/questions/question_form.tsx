"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Field from '@/app/components/utils_forms/Field';
import ChoiseBox from '@/app/components/register/selectDepart';
import Field_Disabled from '@/app/components/utils_forms/Field_Disabled';
import Text_Area from '@/app/components/utils_forms/Text_Area';
import Standard_button from '@/app/components/utils_forms/Button';
import { makeChange } from '@/lib/validation/makeChange';
import { useAuthStore } from '@/app/components/maintenance/maintenance_storages/question_storage';
import { ParamSection } from '@/types';
import { fetchedSections } from '@/app/components/actions/actions_sections/actions';
import {submitFormQuestion, comeBack,Sections} from '../questions/maintenance_methods';
import {useRouter} from 'next/navigation';
const Question_Form: React.FC = () => {
     const Question = useAuthStore(state => state.question);
    const [loading, setLoading] = useState(true);
    const [id,setId]=useState(Question?.id);
    const [question, setQuestion] = useState(Question?.question);
    const [description, setDescription] = useState(Question?.description);
    const [sections, setSections] = useState<ParamSection[]>([]);
    const [section, setSection] = useState(Question?.section);
    const { handleSubmit, register, formState: { errors } } = makeChange();
    const router = useRouter();
    useEffect(() => {
        if (Question) { setLoading(false);}
    }, [Question]);
    useEffect(() => {
        const initialize = async () => {
            const fetchSections = await fetchedSections(Sections);
            setSections(fetchSections.props.data);
        };
        initialize();
    }, []);
    const submitForm = async () => { await submitFormQuestion(id, question, description,section).then(()=>router.push('/home_page/maintenance/mainte_questions/')); }
    return (
        <>
        <div className=' py-5 drop-shadow-lg m-1 flex flex-col items-center pr-7 pl-7' >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4 w-full">
                <Field_Disabled text_Field={id} setText_Field={setId} titule={'Id:'} type={"text"} register={register} error={errors.id} name={"id"}></Field_Disabled>
                <Field text_Field={question} setText_Field={setQuestion} titule={'Pregunta:'} type={"text"} register={register} error={errors.name} name={"name"}></Field>
                <Text_Area text_Field={description} setText_Field={setDescription} titule={'Descripción:'} type={"text"} register={register} error={errors.description} name={"description"}></Text_Area>
                <ChoiseBox data={sections} selectData={section} onChange={setSection} titule="Sección:"/>
            </div>
            <div className='grid grid-cols-2 md:grid-cols-2 gap-8 justify-center'>
                <div className='flex justify-center'>
                    <Link href={'/home_page/maintenance/mainte_questions/'}>
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
export default Question_Form;