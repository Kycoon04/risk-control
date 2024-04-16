"use client";
import React from 'react';

interface ParamDepartment {
    id:string;
    name: string;
    unit: string;
}

interface StandardChoiceBoxProps {
    departments: ParamDepartment[];
    selectedDepartment: string;
    onChange: (value: string) => void;
}

const Standard_ChoiseBox: React.FC<StandardChoiceBoxProps> = ({ departments, selectedDepartment, onChange }) => {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onChange(e.target.value);
    };

    return (
        <div className="flex flex-col pr-8 pl-8">
            <label htmlFor="department" className="text-white">Departamento:</label>
            <select id="department" value={selectedDepartment} onChange={handleChange} className="mt-1 block w-[100%] text-black rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                {departments.map(department => (
                    <option key={department.id} value={department.id}>{department.name}</option>
                ))}
            </select>
        </div>
    );
};

export default Standard_ChoiseBox;