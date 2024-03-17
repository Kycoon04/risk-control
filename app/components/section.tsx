"use client";
import { useState } from 'react';
import React from "react";
import Question from './question';
import Pagination from '@mui/material/Pagination';

interface Forms {
    titule: string;
}
const Componente: React.FC<Forms> = ({ titule }) => {

    const QuestionsPerPage = 1;
    const [isOpen, setIsOpen] = useState(false);
    const [page, setPage] = React.useState(1)

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const questionData = [
        { id: 1, text: 'Compromiso', question: '¿Cuál es tu color favorito?', options: ["Rojo", "Azul", "Verde", "negro"] },
        { id: 2, text: 'Ética', question: '¿Cuál es tu animal favorito?', options: ["Rojo", "Azul", "Verde", "negro"] },
        { id: 3, text: 'Personal', question: '¿Cuál es tu comida favorita?', options: ["Rojo", "Azul", "Verde", "negro"] },
        { id: 4, text: 'Estructura', question: '¿Cuál es tu comida favorita?', options: ["Rojo", "Azul", "Verde", "negro"] },
    ];
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    }

    const renderQuestions = () => {
        const startIndex = (page - 1) * QuestionsPerPage;
        const endIndex = startIndex + QuestionsPerPage;

        const questions = [];
        for (let i = startIndex; i < Math.min(endIndex, questionData.length); i++) {
            questions.push(<Question options={questionData[i].options} question={questionData[i].question} titule={questionData[i].text} key={i} />);
        }
        return questions;
    };

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
                    {renderQuestions()}
                    <Pagination className='m-5 bg-white rounded-lg p-2'
                        count={Math.ceil(questionData.length / QuestionsPerPage)}
                        page={page}
                        onChange={handleChange}
                        showFirstButton
                        showLastButton
                        size="large"/>
                </div>
            </div>
        </div>
    );
}

export default Componente;