"use client";
import React from 'react';
import Link from 'next/link';
import { FaPen } from 'react-icons/fa';
import { FaWpforms } from 'react-icons/fa';
import { useAuthStore } from "@/provider/store"
import { Form } from '@/types';
import { FaEye } from "react-icons/fa";
interface ComponenteProps extends Form {
    url: string;
    complete: string;
}

const Componente: React.FC<ComponenteProps> = ({ id, name, state, inicialperiod, finalperiod, url, complete }) => {
    const setForm = useAuthStore(state => state.setForm);
    const handleFormSelection = () => {
        const newForm: Form = {
            id: id,
            name: name,
            state: state,
            inicialperiod: inicialperiod,
            finalperiod: finalperiod,
        };
        setForm(newForm);
    };

    return (
        <div className='flex justify-center'>
            <div className='flex flex-col sm:flex-row w-full sm:w-[90%] bg-gray-200 m-3 p-3 rounded-3xl gap-10 items-center justify-between'>
                <h2 className='text-2xl sm:pr-10 text-center sm:text-left text-white flex items-center'>
                    <FaWpforms className='text-3xl m-4 text-white' />
                    {name}
                </h2>
                <div className='bg-gray-1000 w-full rounded-3xl p-2 justify-start flex'>
                    <h3 className='ml-4  text-center sm:text-left'> {complete}</h3>
                </div>
                {complete === "Completado" ? (
                    // Si complete es "Completado"
                    <div className='bg-purple-400 rounded-3xl text-white' onClick={handleFormSelection}>
                        <Link href={url}>
                            <FaEye className='text-4xl m-4 tex-white' />
                        </Link>
                    </div>
                ) : (
                    <div className='bg-gray-400 rounded-3xl text-white' onClick={handleFormSelection}>
                        <Link href={url}>
                            <FaPen className='text-4xl m-4 tex-white' />
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Componente;