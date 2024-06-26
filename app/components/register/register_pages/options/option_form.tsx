"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Text_Area from '@/app/components/utils_forms/Text_Area';
import Standard_button from '@/app/components/utils_forms/Button';
import { makeValidationForm } from '@/lib/validation/makeValidationForm';
import { fetchQuestion} from '@/app/components/actions/actions_questions/actions'
import { useAuthStore } from '@/app/components/maintenance/maintenance_storages/option_storage';
import { ParamOption } from '@/types';
import ChoiseBox from '@/app/components/register/selectQuestion';
import ChoiseBoxScore from '@/app/components/utils_forms/ChoiseBox_States'
import { submitFormOption, Questions} from '../options/register_methods';
import {useRouter} from 'next/navigation';
const Option_Form: React.FC = () => {
     const Option = useAuthStore(state => state.option);
    const [loading, setLoading] = useState(true);
    const [id,setId]=useState("");
    const [question, setQuestion] = useState("1");
    const [option, setOption] = useState("");
    const [questions, setQuestions] = useState<ParamOption[]>([]);
    const [scores, setScores] = useState<string[]>(['20', '40','60','80','100']);
    const [score, setScore] = useState("");
    const { handleSubmit, register, formState: { errors } } = makeValidationForm();
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
    const submitForm = async () => { await submitFormOption(option,question,score).then(()=>router.push('/home_page/maintenance/mainte_options/')); }
    const comeBack = async () => { }
    return (
        <>
        <div className=' py-5 drop-shadow-lg m-1 flex flex-col items-center pr-7 pl-7' >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4 w-full">
                <Text_Area text_Field={option} setText_Field={setOption} titule={'Opción:'} type={"text"} register={register} error={errors.name} name={"name"}></Text_Area>
                <ChoiseBox data={questions} selectData={question} onChange={setQuestion} titule="Preguntas:"/>
                <ChoiseBoxScore data={scores} selectData={score} onChange={setScore} titule="Puntaje:"></ChoiseBoxScore>
            </div>
            <div className='grid grid-cols-2 md:grid-cols-2 gap-8 justify-center'>
                <div className='flex justify-center'>
                    <Link href={'/home_page/maintenance/mainte_options/'}>
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
export default Option_Form;