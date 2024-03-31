"use client";
import { useAuthStore } from '@/provider/store';
import Standard_button from '../components/Button';
import { BsPencilSquare } from "react-icons/bs";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Spinner from './Spinner';

const Componente: React.FC = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const User = useAuthStore(state => state.user);
    const changelogged = useAuthStore(state => state.changeLogged);
    const logout = async () => {
        changelogged();
        router.push('/');
    };
    useEffect(() => {
        if (User) {
            setLoading(false);
        }
    }, [User]);

    return (
        <div className='bg-blue-1000 w-90vw md:w-90 sm:w-[90%] m-10 rounded-md justify-center'>
            {loading &&
                <Spinner />}
            {!loading && <>
                <h1 className="text-center text-4xl font-extrabold text-white m-10 mb-5">
                    {'Perfil'}
                </h1>
                <div className='m-10 items-center justify-center flex flex-col'>
                    <h1 className='text-white text-3xl p-3'>Usuario: {User?.nickname}</h1>
                    <h1 className='text-white text-xl p-3'>Nombre: {User?.name} {User?.second_name}</h1>
                    <h1 className='text-white text-xl p-3'>Apellidos: {User?.surname} {User?.second_surname}</h1>
                    <h1 className='text-white text-xl p-3'>Correo: {User?.email}</h1>
                    <h1 className='text-white text-xl p-3'>Telefono: {User?.phone_number}</h1>
                    <Standard_button fuction={logout} titule={"Cerrar sesión"} width={"150px"}></Standard_button>
                </div>
            </>
            }
        </div>
    );
}

export default Componente;