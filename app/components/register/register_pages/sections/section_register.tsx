"use client";
import Section_Form from "@/app/components/register/register_pages/sections/section_form"
const SectionsRegister: React.FC = () => {
    return (
        <>
            <div className='bg-gray-200 w-90vw md:w-90 sm:w-[90%] m-3 p-3 flex flex-col rounded-2xl items-center justify-center'>
                <h2 className='text-2xl sm:text-center text-white text-center m-3'>
                    Registro de Secciones
                </h2>
                    <Section_Form></Section_Form>
            </div>

        </>
    );
};
export default SectionsRegister;