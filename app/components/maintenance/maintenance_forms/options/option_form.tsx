"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Field_Disabled from '@/app/components/utils_forms/Field_Disabled';
import Text_Area from '@/app/components/utils_forms/Text_Area';
import Standard_button from '@/app/components/utils_forms/Button';
import { changeState } from '@/lib/validation/changeState';
import { fetchQuestion} from '@/app/components/actions/actions_questions/actions'
import { useAuthStore } from '@/app/components/maintenance/maintenance_storages/option_storage';
import { ParamOption } from '@/types';
import ChoiseBox from '@/app/components/register/selectQuestion';
import { submitFormOption, Questions, comeBack} from '../options/maintenance_methods';
import ChoiseBoxScore from '@/app/components/utils_forms/ChoiseBox_States'
import {useRouter} from 'next/navigation';
const Option_Form: React.FC = () => {
     const Option = useAuthStore(state => state.option);
    const [loading, setLoading] = useState(true);
    const [id,setId]=useState(Option.id);
    const [question, setQuestion] = useState(Option?.question);
    const [option, setOption] = useState(Option?.option);
    const [questions, setQuestions] = useState<ParamOption[]>([]);
    const [score, setScore] = useState(Option?.score);
    const [scores, setScores] = useState<string[]>(['20', '40','60','80','100']);
    const { handleSubmit, register, formState: { errors } } = changeState();
    const router = useRouter();
    useEffect(() => {
        if (Option) { setLoading(false); }
    }, [Option]);
    useEffect(() => {
        const initialize = async () => {
            const fetchedOptions = await fetchQuestion(Questions);
            setQuestions(fetchedOptions.props.data);
        };
        initialize();
    }, []);
    const submitForm = async () => { await submitFormOption(id,option,question,score).then(()=>router.push('/home_page/maintenance/mainte_options/')); }
    return (
        <>
        <div className=' py-5 drop-shadow-lg m-1 flex flex-col items-center pr-7 pl-7' >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4 w-full">
                <Field_Disabled text_Field={id} setText_Field={setId} titule={'Id:'} type={"text"} register={register} error={errors.id} name={"id"}></Field_Disabled>
                <Text_Area text_Field={option} setText_Field={setOption} titule={'Opción:'} type={"text"} register={register} error={errors.name} name={"name"}></Text_Area>
                <ChoiseBoxScore data={scores} selectData={score} onChange={setScore} titule="Puntaje:"></ChoiseBoxScore>
                <ChoiseBox data={questions} selectData={question} onChange={setQuestion} titule="Preguntas:"/>
            </div>
            <div className='grid grid-cols-2 md:grid-cols-2 gap-8 justify-center'>
                <div className='flex justify-center'>
                    <Link href={'/home_page/maintenance/mainte_options/'}>
                        <Standard_button fuction={comeBack} titule={"Regresar"} width={"350px"}></Standard_button>
                    </Link>
                </div>
                <div className='flex justify-center'>
                    <Link href={'/home_page/maintenance/mainte_options/'}>
                        <Standard_button fuction={handleSubmit(submitForm)} titule={"Guardar"} width={"350px"}></Standard_button>
                    </Link>
                </div>
            </div>
        </div>
        </>
    );
}
export default Option_Form;