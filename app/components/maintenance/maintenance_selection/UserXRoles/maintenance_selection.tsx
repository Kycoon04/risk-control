"use client";
import Link from 'next/link';
import RolesList from "@/app/components/maintenance/maintenance_selection/UserXRoles/roles_list"
const MaintenanceSelection: React.FC = () => {
    return (
        <>
            <div className='bg-gray-200 w-90vw md:w-90 sm:w-[90%] m-3 p-3 flex flex-col rounded-2xl items-center justify-center'>
                <h2 className='text-2xl sm:text-center text-white text-center m-3'>
                    Mantenimiento de Usuarios
                </h2>
                <h2 className='text-2xl sm:text-center text-white text-center m-3'>
                    Seleccionar Roles
                </h2>
                    <RolesList></RolesList>
            </div>

        </>
    );
};
export default MaintenanceSelection;