import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import React from "react";
import Pagination from '@mui/material/Pagination';
import { useAuthStore } from '@/provider/store';
import Spinner from '../notifications/Spinner';
import Standard_button from '../utils_forms/Button';
import { Options, ParamQuestions, Section, FormsTitle } from '@/types';
import { renderQuestions } from './render_questions';
import { fetchDataForSection, postAnswersSection } from '@/app/components/actions/actions_sections/actions';

const Component: React.FC<FormsTitle> = ({ title }) => {
    const router = useRouter();
    const forms = useAuthStore((state) => state.form);
    const User = useAuthStore(state => state.user);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const section = useAuthStore((state) => state.section);
    const [questions, setQuestions] = useState<ParamQuestions[]>([]);
    const [allOptions, setAllOptions] = useState<Options[][]>([]);
    const [selectedOptions, setSelectedOptions] = useState<{ [key: string]: string | null }>({});
    const [page, setPage] = React.useState(1);
    const [sections, setSections] = useState<Section[]>([]);
    const QuestionsPerPage = 1;
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    }

    const handleButtonClick = (questionId: string, optionSelect: string) => {
        setSelectedOptions(prevState => ({
            ...prevState,
            [questionId]: optionSelect
        }));
    };

    useEffect(() => {
        fetchDataForSection(section.id, forms?.id, setQuestions, setSections, setAllOptions, setIsLoading);
    }, [section]);

    return (
        <div className='bg-blue-1000 w-90vw md:w-90 sm:w-[90%] m-10 rounded-md justify-center items-center flex'>
            <div className='bg-gray-200 w-[90%] m-10 p-5 rounded-3xl flex flex-col items-center justify-center'>
                <div className='text-3xl my-5'>{title}</div>
                <div className='m-5 items-center flex-col flex '>
                    {isLoading ? (
                        <Spinner />
                    ) : (
                        renderQuestions(questions, allOptions, selectedOptions, handleButtonClick, page, QuestionsPerPage)
                    )}
                    <div className='flex flex-col'>
                        <Pagination
                            className='mt-5 bg-white rounded-lg p-2'
                            count={Math.ceil(questions.length / QuestionsPerPage)}
                            page={page}
                            onChange={handleChange}
                            size="large"
                        />
                        {page === Math.ceil(questions.length / QuestionsPerPage) && (
                            <Standard_button
                                fuction={() => {postAnswersSection(selectedOptions, section, forms, sections, User); router.push("/home_page");}}
                                titule="Enviar"
                                width={"400px"}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Component;
