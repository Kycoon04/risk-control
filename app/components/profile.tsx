"use client";
import Standard_button from '../components/Button';
import { BsPencilSquare } from "react-icons/bs";
const logOut = () => {

};
const Componente: React.FC = () => {
    return (
        <div className='bg-blue-1000 w-90vw md:w-90 sm:w-[90%] m-10 rounded-md justify-center'>
            <h1 className="text-center text-4xl font-extrabold text-white m-10 mb-5">
                {'Perfil'}
            </h1>
            <div className='m-10 items-center justify-center flex flex-col'>
                <h1 className='text-white text-3xl p-3'>Username</h1>
                <h1 className='text-white text-xl p-3'>Nombre: </h1>
                <h1 className='text-white text-xl p-3'>Apellido: </h1>
                <h1 className='text-white text-xl p-3'>Correo: </h1>
                <h1 className='text-white text-xl p-3'>Telefono:</h1>
                <Standard_button fuction={logOut} titule={"Cerrar sesión"} width={"150px"}></Standard_button>
            </div>
        </div>
    );
}

export default Componente;