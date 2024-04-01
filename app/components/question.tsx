"use client";
import { useState } from 'react';
import Standard_button from './options_Forms';

interface Field {
    titule: string;
    question: string;
    options: string[];
    selected?: boolean;
    selectedOption: string | null;
    onButtonClick: (option: string) => void;
}

const Componente: React.FC<Field> = ({ question, titule, options, selectedOption, onButtonClick }) => {
    return (
        <div className='bg-gray-1000 w-full rounded-3xl'>
            <h2 className='p-5 font-light text-2xl text-white'>
                {question}
            </h2>
            <span className='flex m-5 mt-2 font-light overflow-auto whitespace-normal text-justify text-white'>
                {titule}
            </span>
            <span className='flex m-5 mt-2 font-thin overflow-auto whitespace-normal text-justify text-white'>
                Señale la opción que describa mejor la situación actual de su entidad.
            </span>
            <div className='m-5'>
                {options.map((option, index) => (
                    <Standard_button
                        key={index}
                        fuction={() => onButtonClick(option)}
                        titule={option}
                        width={"400px"}
                        selected={option === selectedOption}
                    />
                ))}
            </div>
        </div>
    );
}

export default Componente;