"use client";
import User_Form from "@/app/components/maintenance/maintenance_forms/users/user_form"
const UsersMaintenance: React.FC = () => {
    return (
        <>
            <div className='bg-gray-200 w-90vw md:w-90 sm:w-[90%] m-3 p-3 flex flex-col rounded-2xl items-center justify-center'>
                <h2 className='text-2xl sm:text-center text-white text-center m-5'>
                    Mantenimiento de Usuarios
                </h2>
                    <User_Form></User_Form>
            </div>

        </>
    );
};
export default UsersMaintenance;