"use client";
import Link from 'next/link';
import { MdOutlineDomainAdd } from "react-icons/md";
import Form_Form from "@/app/components/maintenance/maintenance_forms/forms/form_form"
const FormsMaintenance: React.FC = () => {
    return (
        <>
            <div className='bg-gray-200 w-90vw md:w-90 sm:w-[90%] m-3 p-3 flex flex-col rounded-2xl items-center justify-center'>
                <h2 className='text-2xl sm:text-center text-white text-center m-3'>
                    Mantenimiento de Formularios
                </h2>
                <div className="bg-gray-200 w-full flex flex-wrap gap-5 rounded-md px-5 place-items-end mb-4">
                    <div className="w-full md:w-auto flex justify-start items-center">
                        <div className='bg-purple-400 flex  gap-3 md:gap-5 rounded-2xl text-white cursor-pointer mr-4 md:mr-12 place-items-end p-2 md:p-3 border-4 text-xs md:text-base' >
                            <Link href={'/home_page/maintenance/mainte_forms/forms_form/select_departments'}>
                                <MdOutlineDomainAdd className="text-white font text-2xl md:text-4xl hover:text-slate-300" />
                            </Link>
                        </div>
                    </div>
                </div>
                    <Form_Form></Form_Form>
            </div>

        </>
    );
};
export default FormsMaintenance;