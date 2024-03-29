"use client";
import React, { useEffect, useState } from "react";
import Preview_logger from "./preview_logger";
import { fectLogger } from "../api/logger/actions";
import Spinner from "./Spinner";
import { IoSearch } from "react-icons/io5";
interface Logger {
    id: string;
    usuario: string;
    transaction_type: string;
    role: string;
    transaction: string;
    ip: string;
    date: string;
}

const Componente: React.FC = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [loggers, setLoggers] = useState<Logger[]>([]);
    const [filters, setFilters] = useState<Partial<Logger>>({
        id: "",
        usuario: "",
        transaction_type: "",
        role: "",
        transaction: "",
        ip: "",
        date: ""
    });

    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const filteredFilters: Logger = {
                id: "", 
                usuario: filters.usuario || "",
                transaction_type: filters.transaction_type || "", 
                role: filters.role || "", 
                transaction: filters.transaction || "",
                ip: filters.ip || "",
                date: filters.date || "", 
            };
            const fetchedSections = await fectLogger(filteredFilters);
            setLoggers(fetchedSections.props.data);
            setIsLoading(false);
        };
        fetchData();
    }, [filters]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        console.log(name, value)
        setFilters({ ...filters, [name]: value || "" });
    };

    return (
        <div className='bg-blue-1000 w-90vw md:w-90 sm:w-max m-10 rounded-md justify-center'>
            <h1 className="text-center text-4xl font-extrabold text-white m-10 mb-5">
                {'Registro de actividades'}
            </h1>
            <div className='m-5 p-2  flex-wrap'>
                <div className="flex flex-wrap flex-col">
                    <button
                        onClick={toggleDropdown}
                        className="flex items-center justify-center w-full py-2 px-3 text-white rounded hover:text-purple-300 md:hover:bg-transparent md:border-0 md:hover:text-purple-300 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent">
                        <IoSearch className="text-white text-xl" />
                        <svg className={`w-3 h-2.5 ms-2.5 transition-transform ${isOpen ? 'rotate-180' : ''}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                        </svg>
                    </button>
                    {isOpen && (
                        Object.keys(filters).map((key) => (
                            <input
                                key={key}
                                type="text"
                                name={key}
                                value={filters[key as keyof Logger]}
                                onChange={handleInputChange}
                                placeholder={`Filtrar por ${key}`}
                                className="m-2 p-2 border border-gray-500 rounded-md text-black"
                            />
                        ))
                    )}
                </div>
                {isLoading && <Spinner />}
                {!isLoading && (
                    loggers.map(logger => (
                        <Preview_logger key={logger.id} usuario={logger.usuario} transaction_type={logger.transaction_type} role={logger.role}
                            transaction={logger.transaction} ip={logger.ip} date={logger.date} />
                    ))
                )}
            </div>
        </div>
    );
}

export default Componente;