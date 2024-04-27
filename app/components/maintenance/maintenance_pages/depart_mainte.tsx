"use client";
import { ParamDepartment } from "@/provider/types";
import { useState, useEffect } from "react";
import {fetchDepartment, deleteDepartment} from "../../actions/actions_departments/actions";
import Spinner from "../../notifications/Spinner";
import Filter from "../../utils_comp/filter";
import DepartmentCard from "../maintenance_cards/department_card";
import { Success, Error } from "../../notifications/alerts";
const DepartMaintenance: React.FC = () => {
    const param: ParamDepartment = {
        id: "",
        name: "",
        description: "",
        unit: "",
    
    };
    const [departments,setDepartments] =useState<ParamDepartment[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [unfiltered, setUnfiltered] = useState<ParamDepartment[]>([]);
    const [filters, setFilters] = useState<Partial<ParamDepartment>>(param);

    const clearFilters = () => {
        setFilters(param);
        setDepartments(unfiltered);
    };
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const fetchedSections = await fetchDepartment(param);
            setDepartments(fetchedSections.props.data);
            setUnfiltered(fetchedSections.props.data);
            setIsLoading(false);
        };
        fetchData();
    }, []);

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
        const deletionResult = await deleteDepartment(parseInt(departmentId, 10));

        if (deletionResult) {
            Success('Departamento eliminado correctamente')
            const fetchedSections = await fetchDepartment(param);
            setDepartments(fetchedSections.props.data);
            setUnfiltered(fetchedSections.props.data);
        } else {
            Error('Error al intentar eliminar el departamento');
        }
    };

    return (
        <div className='bg-gray-200 w-90vw md:w-90 sm:w-[90%] m-3 p-3 flex flex-col rounded-3xl items-center justify-center'>
            <h2 className='text-2xl sm:text-center text-white text-center m-5'>
                Mantenimiento de Departamentos
            </h2>
            <Filter<ParamDepartment> filters={filters} setFilters={setFilters} clearFilters={clearFilters} />
                {isLoading ? (
                    <Spinner />) : (
                    departments.map((department) => (
                        <DepartmentCard key={department.id} prompt_one="Nombre:" prompt_two="Unidad:" prompt_three="Descripción:" handleDeleteDepartment={handleDeleteDepartment} {...department} />
             )))}
        </div>
    );
};

export default DepartMaintenance;