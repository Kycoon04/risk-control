"use client";
import Link from 'next/link';
import { ParamDepartment,departXForms,departmentSelected } from "@/types";
import { useState, useEffect } from "react";
import Spinner from "../../../notifications/Spinner";
import Filter from "../../../utils_comp/Filters/filter";
import DepartmentCard from "../../../maintenance/maintenance_selection/DepartmentsXForms/department_card";
import { useAuthStore } from '@/app/components/maintenance/maintenance_storages/form_storage';
import {deleteDepartXIdForms, postDepartXForm} from "../../../actions/actions_deparxforms/actions";
import { IoReturnDownBack } from "react-icons/io5";
import {param,importList,filtered,stateAdded,stateDeleted,updateData,loadData} from '../DepartmentsXForms/selection_methods'
const DepartmentsList: React.FC = () => {
    const [departments,setDepartments] =useState<ParamDepartment[]>([]);
    const [departmentsState,setDepartmentsState] =useState<departmentSelected[]>([]);
    const [departXForm,setDepartXForms] =useState<departXForms[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [unfiltered, setUnfiltered] = useState<ParamDepartment[]>([]);
    const [filters, setFilters] = useState<Partial<ParamDepartment>>(param);
    const form = useAuthStore(state => state.form);
    const clearFilters = () => { setFilters(param); setDepartments(unfiltered); };
    useEffect(() => {
        const fetchData = async () => { loadData(setDepartments,setUnfiltered,setDepartXForms,form, setIsLoading); }; fetchData();
    }, []);
    useEffect(() => {
        const fetchData = async () => {
            setDepartmentsState(importList(departXForm, departments));
        }; if (departments.length > 0 && departXForm.length > 0) {fetchData();}
    }, [departments, departXForm]);
    useEffect(() => {
        const applyFilters = () => { setDepartments( filtered(unfiltered,filters)); }; applyFilters();
    }, [filters, unfiltered]);
    const handleDeleteDepartment = async (departmentId: string) => {
        const deletionResult = await deleteDepartXIdForms(parseInt(form.id, 10),parseInt(departmentId, 10));
        stateDeleted(deletionResult,setDepartments,setUnfiltered,setDepartXForms,form);
    };
    const handleAddDepartment = async (departmentId: string) => {
        const addedResult = await postDepartXForm(parseInt(form.id, 10),parseInt(departmentId, 10));
        stateAdded(addedResult?.ok||false,setDepartments,setUnfiltered,setDepartXForms,form);
    };
    return (
        <div className='bg-gray-200 w-90vw md:w-90 sm:w-[90%] m-3 p-3 flex flex-col rounded-3xl items-center justify-center'>
            <Filter<ParamDepartment> filters={filters} setFilters={setFilters} clearFilters={clearFilters} />
            <div className="bg-gray-200 w-full flex flex-wrap gap-5 rounded-md px-5 place-items-end mb-4">
                    <div className="w-full md:w-auto flex justify-start items-center">
                        <div className='bg-purple-400 flex  gap-3 md:gap-5 rounded-2xl text-white cursor-pointer mr-4 md:mr-12 place-items-end p-2 md:p-3 border-4 text-xs md:text-base' >
                            <Link href={'/home_page/maintenance/mainte_forms/forms_form/'}>
                                <IoReturnDownBack className="text-white font text-2xl md:text-4xl hover:text-slate-300" />
                            </Link>
                        </div>
                    </div>
                </div>
                {isLoading ? (
                    <Spinner />) : (
                    departmentsState.map((departState) => (
                        <DepartmentCard key={departState.department.id} prompt_one="Nombre:" prompt_two="Unidad:" prompt_three="Estado:" handleDeleteDepartment={handleDeleteDepartment} handleAddDepartment={handleAddDepartment} {...departState} />
             )))}
        </div>
    );
};
export default DepartmentsList;