"use client"
import React, { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Logger } from '@/types';
import { applyFilters } from "./FilterApplier";
import { fetchData } from "./Filterfetch";
import ActivityRegister from "./ActivityRegister";

const Componente: React.FC = () => {
    const filterInit: Logger = {
        usuario: "", transaction_type: "", role: "", transaction: "", ip: "", date: ""
    }
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [loggers, setLoggers] = useState<Logger[]>([]);
    const [unfilteredLoggers, setUnfilteredLoggers] = useState<Logger[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [filters, setFilters] = useState<Partial<Logger>>(filterInit);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 6;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = loggers.slice(indexOfFirstItem, indexOfLastItem);
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        fetchData(filters, setIsLoading, setLoggers, setUnfilteredLoggers);
    }, []);

    useEffect(() => {
        applyFilters(unfilteredLoggers, filters, setLoggers);
    }, [filters, unfilteredLoggers, setLoggers]);

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
    return (
        <ActivityRegister
          isOpen={isOpen} filters={filters} toggleDropdown={toggleDropdown} handleInputChange={handleInputChange}
          handleSelectChange={handleSelectChange}
          clearFilters={() => {setFilters(filterInit);setLoggers(unfilteredLoggers);}}
          setFilters={setFilters} isLoading={isLoading} currentItems={currentItems} loggers={loggers}
          itemsPerPage={itemsPerPage} currentPage={currentPage} changePage={changePage}
        />
      );
    };

export default Componente;