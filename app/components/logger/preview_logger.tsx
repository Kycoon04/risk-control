"use client";

import {Logger} from '@/types';

const Componente: React.FC<Logger> = ({ usuario, transaction_type, role, transaction, ip, date }) => {
    return (
        <div className='flex justify-center'>
            <div className='flex flex-col sm:flex-row bg-gray-200 m-3 p-3 rounded-3xl gap-10 items-center justify-start'>
            <div className='flex flex-col gap-2 items-start m-5'>
                    <p className='text-xl'>Usuario: {usuario}</p>
                    <p className='text-xl'>Rol: {role}</p>
                    <p className='text-xl'>Tipo de transacción: {transaction_type}</p>
                    <p className='text-xl'>Transacción: {transaction}</p>
                    <p className='text-xl'>IP: {ip}</p>
                    <p className='text-xl'>Fecha: {date}</p>
                </div>
            </div>
        </div>

    );
}

export default Componente;