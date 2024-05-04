"use client";
import React from 'react';
import { StandardChoiceBoxStates } from '@/types';

const Standard_ChoiseBox: React.FC<StandardChoiceBoxStates> = ({ data, selectData, onChange ,titule}) => {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onChange(e.target.value);
    };

    return (
        <div className="flex flex-col pr-8 pl-8">
            <label htmlFor="department" className="text-white">{titule}</label>
            <select id="department" value={selectData} onChange={handleChange} className="mt-1 block w-[100%] text-black rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                {data.map((option) => (
                     <option key={option} value={option}>{option}</option>
                ))}
            </select>
        </div>
    );
};

export default Standard_ChoiseBox;