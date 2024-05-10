"use client";
import Form_Form from "@/app/components/maintenance/maintenance_forms/forms/form_form"
const FormsMaintenance: React.FC = () => {
    return (
        <>
            <div className='bg-gray-200 w-90vw md:w-90 sm:w-[90%] m-3 p-3 flex flex-col rounded-2xl items-center justify-center'>
                <h2 className='text-2xl sm:text-center text-white text-center m-3'>
                    Mantenimiento de Formularios
                </h2>
                    <Form_Form></Form_Form>
            </div>

        </>
    );
};
export default FormsMaintenance;