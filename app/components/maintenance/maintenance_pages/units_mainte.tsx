"use client";
import Link from 'next/link';
import { FaRegPlusSquare } from "react-icons/fa";
import { ParamUnit } from "@/types";
import PaginationBar from "../paginationBar";
import { useState, useEffect } from "react";
import { fetchUnit, deleteUnit } from "../../actions/actions_units/actions";
import Spinner from "../../notifications/Spinner";
import Filter from "../../utils_comp/Filters/filter";
import { useAuthStore } from '@/app/components/maintenance/maintenance_storages/unit_storage';
import UnitCard from "../maintenance_cards/unit_card"
import { param, filtered, stateDeleted, updateData } from "../maintenance_pages/methods_pages/units_methods"
const UnitsMaintenance: React.FC = () => {
    const [units, setUnits] = useState<ParamUnit[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [unfiltered, setUnfiltered] = useState<ParamUnit[]>([]);
    const [filters, setFilters] = useState<Partial<ParamUnit>>(param);
    const setUnit = useAuthStore(state => state.setUnit);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 4;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = units.slice(indexOfFirstItem, indexOfLastItem);
    const clearFilters = () => { setFilters(param); setUnits(unfiltered); };
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const fetchedSections = await fetchUnit(param);
            updateData(setUnits, setUnfiltered, fetchedSections);
            setIsLoading(false);
        }; fetchData();
    }, []);
    useEffect(() => {
        const applyFilters = () => {
            const filteredUnits = filtered(unfiltered, filters);
            setUnits(filteredUnits);
        }; applyFilters();
    }, [filters, unfiltered]);
    const handleDeleteUnit = async (unitId: string) => {
        const deletionResult = await deleteUnit(parseInt(unitId, 10));
        stateDeleted(deletionResult, setUnits, setUnfiltered);
    };
    const changePage = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };
    const handleModifyUnit = async (unit: ParamUnit) => { setUnit(unit); };
    return (
        <div className='bg-gray-200 w-90vw md:w-90 sm:w-[90%] m-3 p-3 flex flex-col rounded-3xl items-center '>
            <h2 className='text-2xl sm:text-center text-white text-center m-5'> Mantenimiento de Unidades </h2>
            <Filter<ParamUnit> filters={filters} setFilters={setFilters} clearFilters={clearFilters} />
            <div className="bg-gray-200 w-full flex flex-wrap gap-5 rounded-md px-5 place-items-end mb-4">
                <div className="w-full md:w-auto flex justify-start items-center">
                    <div className='bg-purple-400 flex  gap-3 md:gap-5 rounded-2xl text-white cursor-pointer mr-4 md:mr-12 place-items-end p-2 md:p-3 border-4 text-xs md:text-base' >
                        <Link href={'/home_page/maintenance/mainte_units/units_register'}>
                            <FaRegPlusSquare className="text-white font text-2xl md:text-4xl hover:text-slate-300" />
                        </Link>
                    </div>
                </div>
            </div>
            {isLoading ? (
                <Spinner />) : (
                currentItems.map((unit) => (
                    <UnitCard key={unit.id} prompt_one="Id:" prompt_two="Nombre:" prompt_three="Descripción:" handleDeleteUnit={handleDeleteUnit} handleModifyUnit={handleModifyUnit} {...unit} />
                )))}
            <div className="flex justify-center">
                <PaginationBar
                    maintenance={units}
                    itemsPerPage={itemsPerPage}
                    currentPage={currentPage}
                    changePage={changePage}
                />
            </div>
        </div>
    );
};
export default UnitsMaintenance;