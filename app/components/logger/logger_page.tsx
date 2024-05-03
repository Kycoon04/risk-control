import React, { useEffect, useState } from "react";
import PreviewLogger from "./preview_logger";
import { fectLogger } from "../../api/logger/actions";
import Spinner from "../notifications/Spinner";
import { IoSearch } from "react-icons/io5";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Pagination } from "@mui/material";
import { Logger } from "@/types";



const Componente: React.FC = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [loggers, setLoggers] = useState<Logger[]>([]);
    const [unfilteredLoggers, setUnfilteredLoggers] = useState<Logger[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [filters, setFilters] = useState<Partial<Logger>>({
        id: "",
        usuario: "",
        transaction_type: "",
        role: "",
        transaction: "",
        ip: "",
        date: ""
    });
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 6;

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const clearFilters = () => {
        setFilters({
            id: "",
            usuario: "",
            transaction_type: "",
            role: "",
            transaction: "",
            ip: "",
            date: ""
        });
        setLoggers(unfilteredLoggers); // Restaurar los registros sin filtrar
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
                date: filters.date || ""
            };
            const fetchedSections = await fectLogger(filteredFilters);
            setUnfilteredLoggers(fetchedSections.props.data);
            setIsLoading(false);
        };
        fetchData();
    }, [filters]);

    useEffect(() => {
        const applyFilters = () => {
            const filteredLoggers = unfilteredLoggers.filter(logger => {
                return Object.keys(filters).every(key => {
                    if (key === "date") {
                        const filterDate = filters.date ? new Date(filters.date).toISOString().split('T')[0] : "";
                        const loggerDate = new Date(logger.date).toISOString().split('T')[0];
                        return filterDate === "" || loggerDate === filterDate;
                    }
                    return logger[key as keyof Logger]
                        .toLowerCase()
                        .includes((filters[key as keyof Logger] || "").toLowerCase());
                });
            });
            setLoggers(filteredLoggers);
        };

        applyFilters();
    }, [filters, unfilteredLoggers]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value || "" });
    };

    const changePage = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = loggers.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <div className="bg-blue-1000 w-90vw md:w-90 sm:w-90 m-10 rounded-md justify-center sm:mx-20">
            <h1 className="text-center text-4xl font-extrabold text-white m-10 mb-5">
                Registro de actividades
            </h1>
            <div className="m-5 p-2 flex flex-col">
                <div className="flex flex-wrap flex-col mb-16">
                    <button
                        onClick={toggleDropdown}
                        className="flex items-center justify-center w-full py-2 px-3 text-white rounded hover:text-purple-300 md:hover:bg-transparent md:border-0 md:hover:text-purple-300 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent">
                        <IoSearch className="text-white text-xl" />
                        <svg
                            className={`w-3 h-2.5 ms-2.5 transition-transform ${isOpen ? "rotate-180" : ""}`}
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 10 6">
                            <path
                                stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                        </svg>
                    </button>
                    <div className="flex flex-col items-center justify-center">
                        {isOpen &&
                            Object.keys(filters).map((key) => {
                                if (key === "date" || key === "transaction_type") {
                                    return null;
                                }
                                return (
                                    <input
                                        key={key}
                                        type="text"
                                        name={key}
                                        value={filters[key as keyof Logger]}
                                        onChange={handleInputChange}
                                        placeholder={`Filtrar por ${key}`}
                                        className="m-2 p-2 border border-gray-500 rounded-md text-black w-[70%]" />
                                );
                            })}
                        {isOpen && filters.hasOwnProperty("transaction_type") && (
                            <select
                                name="transaction_type"
                                value={filters.transaction_type}
                                onChange={handleSelectChange}
                                className="m-2 p-2 border border-gray-500 rounded-md text-black">
                                <option value="" disabled hidden>
                                    Filtrar por tipo de transacción
                                </option>
                                <option value="GET">GET</option>
                                <option value="POST">POST</option>
                                <option value="DELETE">DELETE</option>
                            </select>
                        )}
                        {isOpen && filters.hasOwnProperty("date") && (
                            <DatePicker
                                selected={
                                    filters.date ? new Date(filters.date) : undefined
                                }
                                onChange={(date: Date) =>
                                    setFilters({ ...filters, date: date.toISOString() })
                                }
                                placeholderText="Filtrar por fecha"
                                className="m-2 p-2 border border-gray-500 rounded-md text-black" />
                        )}
                        {isOpen && (
                            <button
                                onClick={clearFilters}
                                className="mt-4 py-2 px-4 bg-red-600 text-white rounded-md shadow-md hover:bg-red-700">
                                Limpiar Filtros
                            </button>
                        )}
                    </div>
                </div>
                {isLoading ? (
                    <Spinner />
                ) : (
                    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 items-center justify-center">
                        {currentItems.map((logger) => (
                            <PreviewLogger //Ask about this
                                id = ""
                                key={logger.id}
                                usuario={logger.usuario}
                                transaction_type={logger.transaction_type}
                                role={logger.role}
                                transaction={logger.transaction}
                                ip={logger.ip}
                                date={logger.date}
                            />
                        ))}
                    </div>
                )}
                <div className="flex justify-center">
                    <Pagination
                        className='mt-5 bg-white rounded-lg p-2'
                        count={Math.ceil(loggers.length / itemsPerPage)}
                        page={currentPage}
                        showFirstButton
                        showLastButton
                        onChange={(event, page) => changePage(page)}
                    />
                </div>
            </div>
        </div>
    );
};

export default Componente;