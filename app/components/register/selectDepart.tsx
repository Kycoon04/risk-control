"use client";
import React from 'react';
import { StandardChoiceBoxProps } from '@/types';

const Standard_ChoiseBox: React.FC<StandardChoiceBoxProps> = ({ data, selectData, onChange ,titule}) => {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onChange(e.target.value);
    };

    return (
        <div className="flex flex-col pr-8 pl-8">
            <label htmlFor="department" className="text-white">{titule}</label>
            <select id="department" value={selectData} onChange={handleChange} className="mt-1 block w-[100%] text-black rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                {data.map(department => (
                    <option key={department.id} value={department.id}>{department.name}</option>
                ))}
            </select>
        </div>
    );
};

export default Standard_ChoiseBox;