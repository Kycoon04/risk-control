"use client";
import Department_Form from "@/app/components/maintenance/maintenance_forms/departments/department_form"
const DepartmentsMaintenance: React.FC = () => {
    return (
        <>
            <div className='bg-gray-200 w-90vw md:w-90 sm:w-[90%] m-3 p-3 flex flex-col rounded-2xl items-center justify-center'>
                <h2 className='text-2xl sm:text-center text-white text-center m-3'>
                    Mantenimiento de Departamentos
                </h2>
                    <Department_Form></Department_Form>
            </div>

        </>
    );
};
export default DepartmentsMaintenance;