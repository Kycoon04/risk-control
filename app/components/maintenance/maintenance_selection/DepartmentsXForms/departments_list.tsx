"use client";
import Link from 'next/link';
import { FaRegPlusSquare } from "react-icons/fa";
import { ParamDepartment,departXForms,departmentSelected } from "@/types";
import { useState, useEffect } from "react";
import {fetchDepartment} from "../../../actions/actions_departments/actions";
import { fetchDepartXIdForms } from '@/app/components/actions/actions_deparxforms/actions';
import Spinner from "../../../notifications/Spinner";
import Filter from "../../../utils_comp/Filters/filter";
import DepartmentCard from "../../../maintenance/maintenance_selection/DepartmentsXForms/department_card";
import { Success, Error } from "../../../notifications/alerts";
import { useAuthStore } from '@/app/components/maintenance/maintenance_storages/form_storage';
import {deleteDepartXIdForms, postDepartXForm} from "../../../actions/actions_deparxforms/actions";
import { IoReturnDownBack } from "react-icons/io5";
const DepartmentsList: React.FC = () => {
    const param: ParamDepartment = {
        id: "",
        name: "",
        description: "",
        unit: "",
    
    };
    const [departments,setDepartments] =useState<ParamDepartment[]>([]);
    const [departmentsState,setDepartmentsState] =useState<departmentSelected[]>([]);
    const [departXForm,setDepartXForms] =useState<departXForms[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [unfiltered, setUnfiltered] = useState<ParamDepartment[]>([]);
    const [filters, setFilters] = useState<Partial<ParamDepartment>>(param);
    const form = useAuthStore(state => state.form);

    const clearFilters = () => {
        setFilters(param);
        setDepartments(unfiltered);
    };
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const fetchedSections = await fetchDepartment(param);
            setDepartments(fetchedSections.props.data);
            const fetchedDepartXForm = await fetchDepartXIdForms(form.id);
            console.log(fetchedDepartXForm)
            setDepartXForms(fetchedDepartXForm);
            setUnfiltered(fetchedSections.props.data);
            setIsLoading(false);
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const list: departmentSelected[] = [];
            for (let i = 0; i < departments.length; i++) {
                const isDepartmentSelected = departXForm.some(depForm => depForm.department === departments[i].id);
                list.push({
                    department: departments[i],
                    state: isDepartmentSelected ? "Agregado" : "No Agregado",
                });
            }
            setDepartmentsState(list);
            console.log(departmentsState)
        };
        if (departments.length > 0 && departXForm.length > 0) {
            fetchData();
        }
    }, [departments, departXForm]);
    useEffect(() => {
        const applyFilters = () => {
            const filteredDepartments = unfiltered.filter(item => {
                return Object.keys(filters).every(key => {
                    const filterValue = filters[key as keyof ParamDepartment];
                    const itemValue = item[key as keyof ParamDepartment];

                    if (typeof filterValue === 'number' || typeof itemValue === 'number') {
                        const stringValue = String(filterValue).toLowerCase();
                        const itemStringValue = String(itemValue).toLowerCase();
                        return itemStringValue.includes(stringValue);
                    } else {
                        return itemValue.toLowerCase().includes((filterValue || "").toLowerCase());
                    }
                });
            });
            setDepartments( filteredDepartments);
        };
        applyFilters();
    }, [filters, unfiltered]);

    const handleDeleteDepartment = async (departmentId: string) => {
        const deletionResult = await deleteDepartXIdForms(parseInt(form.id, 10),parseInt(departmentId, 10));

        if (deletionResult) {
            Success('Departamento eliminado correctamente')
            const fetchedSections = await fetchDepartment(param);
            setDepartments(fetchedSections.props.data);
            setUnfiltered(fetchedSections.props.data);
            const fetchedDepartXForm = await fetchDepartXIdForms(form.id);
            setDepartXForms(fetchedDepartXForm);
        } else {
            Error('Error al intentar eliminar el departamento');
        }
    };
    const handleAddDepartment = async (departmentId: string) => {
        const deletionResult = await postDepartXForm(parseInt(form.id, 10),parseInt(departmentId, 10));

        if (deletionResult) {
            Success('Departamento agregado correctamente')
            const fetchedSections = await fetchDepartment(param);
            setDepartments(fetchedSections.props.data);
            setUnfiltered(fetchedSections.props.data);
            const fetchedDepartXForm = await fetchDepartXIdForms(form.id);
            setDepartXForms(fetchedDepartXForm);
        } else {
            Error('Error al intentar agregar el departamento');
        }
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