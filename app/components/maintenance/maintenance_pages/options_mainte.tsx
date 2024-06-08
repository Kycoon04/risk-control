"use client";
import Link from 'next/link';
import { FaRegPlusSquare } from "react-icons/fa";
import PaginationBar from "../paginationBar";
import { ParamOption } from "@/types";
import { useState, useEffect } from "react";
import { fetchOptions, deleteOption } from "../../actions/actions_options/actions";
import Spinner from "../../notifications/Spinner";
import Filter from "../../utils_comp/Filters/filter";
import OptionCard from "../maintenance_cards/option_card";
import { useAuthStore } from '@/app/components/maintenance/maintenance_storages/option_storage';
import { param,params, filtered, stateDeleted, updateData } from '../maintenance_pages/methods_pages/options_methods'
const OptionsMaintenance: React.FC = () => {
    const [Count, setCount] = useState(0);
    const [options, setOptions] = useState<ParamOption[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [unfiltered, setUnfiltered] = useState<ParamOption[]>([]);
    const [filters, setFilters] = useState<Partial<ParamOption>>(param);
    const setOption = useAuthStore(state => state.setOption);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 4;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = options.slice(indexOfFirstItem, indexOfLastItem);
    const clearFilters = () => { setFilters(param); setOptions(unfiltered); };
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const fetchedSections = await fetchOptions(params);
            updateData(setOptions, setUnfiltered, fetchedSections,setCount);
            setIsLoading(false);
        }; fetchData();
    }, []);
    useEffect(() => {
        const applyFilters = () => {
            const filteredDepartments = filtered(unfiltered, filters);
            setOptions(filteredDepartments);
        }; applyFilters();
    }, [filters, unfiltered]);
    const handleDeleteOption = async (optionId: string) => {
        const deletionResult = await deleteOption(parseInt(optionId, 10));
        stateDeleted(deletionResult, setOptions, setUnfiltered,setCount);
    };
    const changePage = async (pageNumber: number) => {
        params.page = pageNumber;
        const fetchedSections = await fetchOptions(params);
        updateData(setOptions, setUnfiltered, fetchedSections,setCount);
        setCurrentPage(pageNumber);
    };
    const handleModifyOption = async (option: ParamOption) => { setOption(option); };
    return (
        <div className='bg-gray-200 w-90vw md:w-90 sm:w-[90%] m-3 p-3 flex flex-col rounded-3xl items-center justify-center'>
            <h2 className='text-2xl sm:text-center text-white text-center m-5'> Mantenimiento de Opciones por Pregunta</h2>
            <Filter<ParamOption> filters={filters} setFilters={setFilters} clearFilters={clearFilters} />
            <div className="bg-gray-200 w-full flex flex-wrap gap-5 rounded-md px-5 place-items-end mb-4">
                <div className="w-full md:w-auto flex justify-start items-center">
                    <div className='bg-purple-400 flex  gap-3 md:gap-5 rounded-2xl text-white cursor-pointer mr-4 md:mr-12 place-items-end p-2 md:p-3 border-4 text-xs md:text-base' >
                        <Link href={'/home_page/maintenance/mainte_options/options_register'}>
                            <FaRegPlusSquare className="text-white font text-2xl md:text-4xl hover:text-slate-300" />
                        </Link>
                    </div>
                </div>
            </div>
            {isLoading ? (
                <Spinner />) : (
                    options.map((option) => (
                    <OptionCard key={option.id} prompt_one="Id Pregunta:" prompt_two="Puntaje:" prompt_three="Opción:" handleDeleteOption={handleDeleteOption} handleModifyOption={handleModifyOption} {...option} />
                )))}
            <div className="flex justify-center">
                <PaginationBar
                    maintenance={options}
                    itemsPerPage={itemsPerPage}
                    currentPage={currentPage}
                    changePage={changePage}
                    count={Count}
                />
            </div>
        </div>
    );
};
export default OptionsMaintenance;