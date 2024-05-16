"use client";
import Option_Form from "@/app/components/register/register_pages/options/option_form"
const OptionRegister: React.FC = () => {
    return (
        <>
            <div className='bg-gray-200 w-90vw md:w-90 sm:w-[90%] m-3 p-3 flex flex-col rounded-2xl items-center justify-center'>
                <h2 className='text-2xl sm:text-center text-white text-center m-3'>
                    Registro de Opciones por Pregunta
                </h2>
                    <Option_Form></Option_Form>
            </div>

        </>
    );
};
export default OptionRegister;