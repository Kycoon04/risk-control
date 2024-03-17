"use client";
import Link from 'next/link';
import { FaPen } from "react-icons/fa6";

interface Field {
    titule: string;
    complete: string;
    url:string;
}

const Componente: React.FC<Field> = ({ titule,complete,url}) => {
    return (
        <div className='flex justify-center'>
            <div className='flex flex-col sm:flex-row w-full sm:w-[90%] bg-gray-200 m-3 p-3 rounded-3xl gap-10 items-center justify-between'>
                <h2 className='text-2xl sm:pr-10 text-center sm:text-left text-white'>
                    {titule}
                </h2>
                <div className='bg-gray-1000 w-full rounded-3xl p-2 justify-start flex'>
                    <h3 className='ml-4  text-center sm:text-left'> {complete}</h3>
                </div>
                <div className='bg-purple-400 rounded-3xl text-white'>
                    <Link href={url}>
                        <FaPen className='text-4xl m-4' />
                    </Link>
                </div>
            </div>
        </div>

    );
}

export default Componente;