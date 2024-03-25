"use client";
import Link from 'next/link';
import { FaPen } from "react-icons/fa6";

interface Field {
    titule: string;
    url:string;
}

const Componente: React.FC<Field> = ({ titule,url}) => {
    return (
        <div className='flex justify-center'>
            <div className='flex flex-col sm:flex-row bg-gray-200 m-3 p-3 rounded-3xl gap-10 items-center justify-start'>
                <h2 className='text-2xl sm:pr-10 text-center sm:text-left text-white'>
                    {titule}
                </h2>
                <div className='bg-purple-400 rounded-3xl text-white cursor-pointer'>
                    <Link href={url}>
                        <FaPen className='text-4xl m-4' />
                    </Link>
                </div>
            </div>
        </div>

    );
}

export default Componente;