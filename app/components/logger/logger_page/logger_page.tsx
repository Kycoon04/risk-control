import React, { useEffect, useState } from "react";
import PreviewLogger from "../preview_logger";
import { fectLogger } from "../../../api/logger/actions";
import Spinner from "../../notifications/Spinner";
import "react-datepicker/dist/react-datepicker.css";
import PaginationBar from "./paginationBar";
import FilterDropdown from "./filterDropdown";
import { Logger } from "@/types";

const Componente: React.FC = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [loggers, setLoggers] = useState<Logger[]>([]);
    const [unfilteredLoggers, setUnfilteredLoggers] = useState<Logger[]>([]);
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
                <FilterDropdown
                    filters={filters}
                    handleInputChange={handleInputChange}
                    handleSelectChange={handleSelectChange}
                    clearFilters={() => clearFilters()}
                />
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
                    <PaginationBar
                        loggers={loggers}
                        itemsPerPage={itemsPerPage}
                        currentPage={currentPage}
                        changePage={changePage}/>
                </div>
            </div>
        </div>
    );
};

export default Componente;