import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";
import {ComponentProps} from '@/types';


function Component<T>(props: ComponentProps<T>) {
    const { filters, setFilters, clearFilters } = props;
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
    };

    return (
        <>
            <button
                onClick={toggleDropdown}
                className="flex items-center justify-center w-full py-2 px-3 text-white rounded hover:text-purple-300 md:hover:bg-transparent md:border-0 md:hover:text-purple-300 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
            >
                <IoSearch className="text-white text-xl" />
                <svg
                    className={`w-3 h-2.5 ms-2.5 transition-transform ${isOpen ? "rotate-180" : ""}`}
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                >
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 4 4 4-4"
                    />
                </svg>
            </button>
            <div className="flex flex-col items-center justify-center">
                {isOpen && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                        {Object.keys(filters).map((key) => (
                            <input
                                key={key}
                                type="text"
                                name={key}
                                value={filters[key as keyof T] as string}
                                onChange={handleInputChange}
                                placeholder={`Filtrar por ${key}`}
                                className="m-2 p-2 border border-gray-500 rounded-md text-black w-full"
                            />
                        ))}
                    </div>
                )}
                {isOpen && (
                    <button
                        onClick={clearFilters}
                        className="mt-4 py-2 px-4 bg-red-600 text-white rounded-md shadow-md hover:bg-red-700"
                    >
                        Limpiar Filtros
                    </button>
                )}
            </div>
        </>
    );
}

export default Component;