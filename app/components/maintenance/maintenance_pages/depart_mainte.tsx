"use client";
import Link from 'next/link';
import { FaRegPlusSquare } from "react-icons/fa";
import { ParamDepartment } from "@/types";
import { useState, useEffect } from "react";
import {fetchDepartment, deleteDepartment} from "../../actions/actions_departments/actions";
import Spinner from "../../notifications/Spinner";
import Filter from "../../utils_comp/Filters/filter";
import DepartmentCard from "../maintenance_cards/department_card";
import { useAuthStore } from '@/app/components/maintenance/maintenance_storages/department.storage';
import {param, filtered, stateDeleted, updateData} from '../maintenance_pages/methods_pages/depart_methods'
const DepartMaintenance: React.FC = () => {
    const [departments,setDepartments] =useState<ParamDepartment[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [unfiltered, setUnfiltered] = useState<ParamDepartment[]>([]);
    const [filters, setFilters] = useState<Partial<ParamDepartment>>(param);
    const setDepartment = useAuthStore(state => state.setDepartment);
    
    const clearFilters = () => { setFilters(param); setDepartments(unfiltered); };
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const fetchedSections = await fetchDepartment(param);
            updateData(setDepartments,setUnfiltered,fetchedSections);
            setIsLoading(false);
        }; fetchData();
    }, []);
    useEffect(() => {
        const applyFilters = () => {
            const filteredDepartments = filtered(unfiltered, filters);
            setDepartments( filteredDepartments);
        }; applyFilters();
    }, [filters, unfiltered]);
    const handleDeleteDepartment = async (departmentId: string) => {
        const deletionResult = await deleteDepartment(parseInt(departmentId, 10));
        stateDeleted(deletionResult, setDepartments, setUnfiltered );
    };
    const handleModifyDepartment = async (department: ParamDepartment) => { setDepartment(department);};
    return (
        <div className='bg-gray-200 w-90vw md:w-90 sm:w-[90%] m-3 p-3 flex flex-col rounded-3xl items-center justify-center'>
            <h2 className='text-2xl sm:text-center text-white text-center m-5'> Mantenimiento de Departamentos</h2>
            <Filter<ParamDepartment> filters={filters} setFilters={setFilters} clearFilters={clearFilters} />
            <div className="bg-gray-200 w-full flex flex-wrap gap-5 rounded-md px-5 place-items-end mb-4">
                    <div className="w-full md:w-auto flex justify-start items-center">
                        <div className='bg-purple-400 flex  gap-3 md:gap-5 rounded-2xl text-white cursor-pointer mr-4 md:mr-12 place-items-end p-2 md:p-3 border-4 text-xs md:text-base' >
                            <Link href={'/home_page/maintenance/mainte_depart/departments_register'}>
                                <FaRegPlusSquare className="text-white font text-2xl md:text-4xl hover:text-slate-300" />
                            </Link>
                        </div>
                    </div>
                </div>
                {isLoading ? (
                    <Spinner />) : (
                    departments.map((department) => (
                        <DepartmentCard key={department.id} prompt_one="Nombre:" prompt_two="Unidad:" prompt_three="Descripción:" handleDeleteDepartment={handleDeleteDepartment} handleModifyDepartment={handleModifyDepartment} {...department} />
             )))}
        </div>
    );
};
export default DepartMaintenance;