"use client";
import Preview_maintenance from "./preview_maintenance";
const Componente: React.FC = () => {
    return (
        <div className='bg-blue-1000 w-90vw md:w-90 sm:w-max m-10 rounded-md justify-center'>
            <h1 className="text-center text-4xl font-extrabold text-white m-10 mb-5">
                {'Mantenimiento'}
            </h1>
            <div className='m-5 p-2  flex-wrap'>
                <Preview_maintenance titule='Formularios' url="/home_page/forms"/>
                <Preview_maintenance titule='Secciones' url="/home_page/forms"/>
                <Preview_maintenance titule='Preguntas' url="/home_page/forms"/>
                <Preview_maintenance titule='Usuarios' url="/home_page/forms"/>
            </div>
        </div>
    );
}

export default Componente;