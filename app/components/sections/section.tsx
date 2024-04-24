"use client";
import { useEffect, useState } from 'react';
import React from "react";
import Question from './question';
import Pagination from '@mui/material/Pagination';
import { useAuthStore} from '@/provider/store';
import { fetchOptions, fetchQuestion, postAnswer} from '../actions/actions';
import Spinner from '../notifications/Spinner';
import Standard_button from '../utils_forms/Button';
import { useRouter } from 'next/navigation';
import {Options,ParamQuestions,Answers, SectionXUser} from '@/provider/types';
import {putSectionXUser} from '../actions/actions_sectionxuser/actions';
interface Forms {
    titule: string | undefined;
}
const Componente: React.FC<Forms> = ({ titule }) => {
    const router = useRouter();
    const User = useAuthStore(state => state.user);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const section = useAuthStore((state) => state.section);
    const [questions, setQuestions] = useState<ParamQuestions[]>([]);
    const [allOptions, setAllOptions] = useState<Options[][]>([]);
    const [selectedOptions, setSelectedOptions] = useState<{ [key: string]: string | null }>({});
    const [isOpen, setIsOpen] = useState(false);
    const [page, setPage] = React.useState(1);

    const QuestionsPerPage = 1;
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    }
    const postanswers = async () => {
        for (const option of Object.values(selectedOptions)) {
            console.log(User?.id,option)
            const paramanswer: Answers = {
                user: User?.id,
                option: option
            };
            const response = await postAnswer(paramanswer);
            console.log(response);
        }
        const paramSectionXUser: SectionXUser = {
            id: "",
            section: section.id,
            user: User?.id,
            complete: "Completado",
        };
        await putSectionXUser(paramSectionXUser);
        router.push("/home_page/forms");
    };

    const handleButtonClick = (questionId: string, optionSelect: string) => {
        setSelectedOptions(prevState => ({
            ...prevState,
            [questionId]: optionSelect
        }));
        console.log(selectedOptions);
    };
    const renderQuestions = () => {
        const startIndex = (page - 1) * QuestionsPerPage;
        const endIndex = startIndex + QuestionsPerPage;
        const renderedQuestions = questions
            .slice(startIndex, endIndex)
            .map((q, index) => {
                const questionIndex = (page - 1) * QuestionsPerPage + index;
                const optionsForQuestion = questionIndex < questionData.length ? questionData[questionIndex].options : { id: [], option: [] };

                const mappedOptions = optionsForQuestion.id.map((id, index) => ({
                    id,
                    option: optionsForQuestion.option[index]
                }));

                return (
                    <Question
                        key={q.id}
                        options={mappedOptions}
                        question={q.question}
                        titule={q.description}
                        selectedOption={selectedOptions[q.id] || null}
                        onButtonClick={(option) => handleButtonClick(q.id, option)}
                    />
                );
            });

        return renderedQuestions;
    };

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const id = section.id;
            const paramQuestion: ParamQuestions = {
                id: "",
                question: "",
                description: "",
                section: id,
            };

            const fetchedSections = await fetchQuestion(paramQuestion);
            setQuestions(fetchedSections.props.data);

            const fetchedOptionsPromises = fetchedSections.props.data.map(async (q: ParamQuestions) => {
                const paramOptions: Options = {
                    id: "",
                    option: "",
                    question: q.id,
                    score: "",
                    TL_Questions:{
                        id: "",
                        question:"",
                        description:"",
                        section:"",
                    }
                };
                const fetchedOptions = await fetchOptions(paramOptions);
                return fetchedOptions.props.data;
            });
            const fetchedOptions = await Promise.all(fetchedOptionsPromises);
            setAllOptions(fetchedOptions);
            setIsLoading(false);
        };
        fetchData();
    }, [section]);
    const questionData = questions.map((q, index) => {
        const optionsForQuestion = allOptions[index] || [];
        return {
            id: q.id,
            text: q.question,
            question: q.description,
            options: {
                id: optionsForQuestion.map(option => option.id),
                option: optionsForQuestion.map(option => option.option),
            }
        };
    });
    return (
        <div className='bg-blue-1000 w-90vw md:w-90 sm:w-[90%] m-10 rounded-md justify-center items-center flex'>
            <div className='bg-gray-200 w-[90%] m-10 p-5 rounded-3xl flex flex-col items-center justify-center'>
                <div className="relative hover:text-black m-5">
                    <button
                        onClick={toggleDropdown}
                        className="flex items-center text-2xl font-normal justify-center w-full py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-purple-300 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent">
                        {titule}
                        <svg className={`w-2.5 h-2.5 ms-2.5 transition-transform ${isOpen ? 'rotate-180' : ''}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                        </svg>
                    </button>
                    {isOpen && (
                        <div className="absolute z-10 top-full left-0 mt-2 w-44 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600 max-h-48 overflow-y-auto">
                            <ul
                                className="py-2 text-sm text-gray-700 dark:text-gray-400"
                                aria-labelledby="dropdownLargeButton">
                                <li>
                                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Riesgo</a>
                                </li>
                                <li>
                                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Actividades</a>
                                </li>
                                <li>
                                    <a href="/" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sistemas</a>
                                </li>
                                <li>
                                    <a href="/" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Seguimiento</a>
                                </li>
                            </ul>
                        </div>)}
                </div>
                <div className='m-5 items-center flex-col flex '>
                    {isLoading ? (
                        <Spinner />
                    ) : (
                        renderQuestions()
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
                                fuction={postanswers}
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

export default Componente;