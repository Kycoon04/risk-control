"use client";
import Link from 'next/link';
import Standard_button from '@/app/components/utils_forms/Button';
import DepartmentsList from "@/app/components/maintenance/maintenance_selection/DepartmentsXForms/departments_list"
const MaintenanceSelection: React.FC = () => {
    const comeBack = async () => { }
    return (
        <>
            <div className='bg-gray-200 w-90vw md:w-90 sm:w-[90%] m-3 p-3 flex flex-col rounded-2xl items-center justify-center'>
                <h2 className='text-2xl sm:text-center text-white text-center m-3'>
                    Mantenimiento de Formularios
                </h2>
                <h2 className='text-2xl sm:text-center text-white text-center m-3'>
                    Seleccionar Departamentos
                </h2>
                    <DepartmentsList></DepartmentsList>
            </div>

        </>
    );
};
export default MaintenanceSelection;