"use client";
import { useEffect, useState } from 'react';
import React from "react";
import Question from './question';
import Pagination from '@mui/material/Pagination';
import { useAuthStore } from '@/provider/store';
import { fetchOptions, fetchQuestion, postAnswer } from '../actions/actions';
import Spinner from '../notifications/Spinner';
import Standard_button from '../utils_forms/Button';
import { useRouter } from 'next/navigation';
import { Options, ParamQuestions, Answers, paramsSection, Section, Form } from '@/types';
import { putForms } from '../actions/actions_forms/actions';
import { putSection } from '../actions/actions_sections/actions';
import { fetchSections } from '../actions/actions_sections/actions';

interface FormsTitle {
    title: string | undefined;
}

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

    const questionData = questions.map((question, index) => {
        const optionsForQuestion = allOptions[index] || [];
        return {
            id: question.id,
            text: question.question,
            question: question.description,
            options: {
                id: optionsForQuestion.map(option => option.id),
                option: optionsForQuestion.map(option => option.option),
            }
        };
    });
    
    const postanswers = async () => {
        for (const option of Object.values(selectedOptions)) {
            const paramAnswer: Answers = {
                user: User?.id,
                option: option
            };
            await postAnswer(paramAnswer);
        }
        const paramSection: paramsSection = {
            id: section.id,
            name: section.name,
            forms: section.forms,
            description: section.description,
            complete: "Completado",
        };
        await putSection(paramSection);
        const updatedSections = sections.map(sec => {
            return sec.id === section.id ? { ...sec, complete: "Completado" } : sec;
        });
        const allSectionsCompleted = updatedSections.every(sec => sec.complete === "Completado");
        if (allSectionsCompleted) {
            console.log(sections);
            const paramForms: Form = {
                id: forms?.id || "",
                name: forms?.name || "",
                state: forms?.state || "",
                inicialperiod: forms?.inicialperiod || "",
                finalperiod: forms?.finalperiod || "",
                complete: "Completado"
            };
            await putForms(paramForms);
        }
        router.push("/home_page");
    };

    const handleButtonClick = (questionId: string, optionSelect: string) => {
        setSelectedOptions(prevState => ({
            ...prevState,
            [questionId]: optionSelect
        }));
    };

    const renderQuestions = () => { // para renderizar las preguntas, esto es otro componente
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
                        title={q.description}
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
            
            const paramQuestion: ParamQuestions = {
                id: "",
                question: "",
                description: "",
                section: section.id,
            };
            const fetchedSections = await fetchQuestion(paramQuestion);
            setQuestions(fetchedSections.props.data);

            const param: paramsSection = {
                id: "",
                forms: forms?.id?.toString(),
                name: "",
                description: "",
                complete: "",
            };
            const fetchedAllSections = await fetchSections(param);
            setSections(fetchedAllSections.props.data);

            const fetchedOptionsPromises = fetchedSections.props.data.map(async (q: ParamQuestions) => {
                const paramOptions: Options = {
                    id: "",
                    option: "",
                    question: q.id,
                    score: "",
                    TlQuestions: {
                        id: "",
                        question: "",
                        description: "",
                        section: "",
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

  

    return (
        <div className='bg-blue-1000 w-90vw md:w-90 sm:w-[90%] m-10 rounded-md justify-center items-center flex'>
            <div className='bg-gray-200 w-[90%] m-10 p-5 rounded-3xl flex flex-col items-center justify-center'>
                <div className='text-3xl my-5'>{title}</div>
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

export default Component;