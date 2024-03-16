"use client";
import Link from 'next/link';
import { FaPen } from "react-icons/fa6";


import {button} from '@/lib/definitions';

const Componente: React.FC<button> =({fuction,titule,width})=>{
    return (
        <button
            className={`relative inline-flex mb-8 hover:bg-purple-450 m-3 p-2 w-[${width}] justify-start text-white me-2 
            overflow-hidden text-sm font-light rounded-sm group bg-purple-400`}
            onClick={fuction}>
            {titule}
        </button>
    );
}
export default Componente;
