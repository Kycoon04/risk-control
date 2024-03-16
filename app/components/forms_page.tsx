"use client";
import Preview_forms from "./preview_forms";
const Componente: React.FC = () => {
    return (
        <div className='bg-blue-1000 w-90vw md:w-90 sm:w-[90%] m-10 rounded-md justify-center'>
            <h1 className="text-center text-4xl font-extrabold text-white m-10 mb-5">
                {'Formularios'}
            </h1>
            <div className='m-5'>
                <Preview_forms titule='Formulario' complete="Sin completar" url="/home_page/forms"/>
                <Preview_forms titule='Formulario' complete="Sin completar" url="/"/>
            </div>
        </div>
    );
}

export default Componente;