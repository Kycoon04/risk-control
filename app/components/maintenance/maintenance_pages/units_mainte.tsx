"use client";
import Link from 'next/link';
import { FaRegPlusSquare } from "react-icons/fa";
import {ParamUnit} from "@/types";
import { useState, useEffect } from "react";
import {fetchUnit, deleteUnit} from "../../actions/actions_units/actions";
import Spinner from "../../notifications/Spinner";
import Filter from "../../utils_comp/Filters/filter";
import { Success, Error } from "../../notifications/alerts";
import { useAuthStore } from '@/app/components/maintenance/maintenance_storages/unit_storage';
import UnitCard from "../maintenance_cards/unit_card"
const UnitsMaintenance: React.FC = () => {
    const param: ParamUnit = {
        id: "",
        name: "",
        description: "",
    };
    const [units,setUnits] =useState<ParamUnit[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [unfiltered, setUnfiltered] = useState<ParamUnit[]>([]);
    const [filters, setFilters] = useState<Partial<ParamUnit>>(param);
    const setUnit = useAuthStore(state => state.setUnit);


    const clearFilters = () => {
        setFilters(param);
        setUnits(unfiltered);
    };
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const fetchedSections = await fetchUnit(param);
            setUnits(fetchedSections.props.data);
            setUnfiltered(fetchedSections.props.data);
            setIsLoading(false);
        };
        fetchData();
    }, []);

    useEffect(() => {
        const applyFilters = () => {
            const filteredUnits = unfiltered.filter(item => {
                return Object.keys(filters).every(key => {
                    const filterValue = filters[key as keyof ParamUnit];
                    const itemValue = item[key as keyof ParamUnit];

                    if (typeof filterValue === 'number' || typeof itemValue === 'number') {
                        const stringValue = String(filterValue).toLowerCase();
                        const itemStringValue = String(itemValue).toLowerCase();
                        return itemStringValue.includes(stringValue);
                    } else {
                        return itemValue.toLowerCase().includes((filterValue || "").toLowerCase());
                    }
                });
            });
            setUnits( filteredUnits);
        };
        applyFilters();
    }, [filters, unfiltered]);

    const handleDeleteUnit = async (unitId: string) => {
        const deletionResult = await deleteUnit(parseInt(unitId, 10));

        if (deletionResult) {
            Success('Unidad eliminada correctamente')
            const fetchedSections = await fetchUnit(param);
            setUnits(fetchedSections.props.data);
            setUnfiltered(fetchedSections.props.data);
        } else {
            Error('Error al intentar eliminar la unidad');
        }
    };
    const handleModifyUnit = async (unit: ParamUnit) => {
        setUnit(unit);
    };
    return (
        <div className='bg-gray-200 w-90vw md:w-90 sm:w-[90%] m-3 p-3 flex flex-col rounded-3xl items-center '>
                <h2 className='text-2xl sm:text-center text-white text-center m-5'>
                    Mantenimiento de Unidades
                </h2>
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
                    units.map((unit) => (
                        <UnitCard key={unit.id} prompt_one="Id:" prompt_two="Nombre:" prompt_three="Descripción:" handleDeleteUnit={handleDeleteUnit} handleModifyUnit={handleModifyUnit} {...unit} />
             )))}
        </div>
    );
};

export default UnitsMaintenance;