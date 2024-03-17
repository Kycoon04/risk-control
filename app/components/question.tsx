"use client";
import Link from 'next/link';
import { FaPen } from "react-icons/fa6";
import Standard_button from './options_Forms';
interface Field {
    titule: string;
    question:string;
    options: string[];
}

const Componente: React.FC<Field> = ({titule,question,options}) => {
    return (
        <div className='bg-gray-1000 w-full rounded-3xl'>
            <h2 className='p-5 font-light text-2xl text-white'>
                {titule}
            </h2>
            <span className='flex m-5 mt-2 font-light overflow-auto whitespace-normal text-justify text-white'>
            {question}
            </span>
            <span className='flex m-5 mt-2 font-thin overflow-auto whitespace-normal text-justify text-white'>
                Señale la opción que describa mejor la situación actual de su entidad.
            </span>
            <div className='m-5'>
                <Standard_button fuction={console.log()} titule={options[0]} width={"400px"}></Standard_button>
                <Standard_button fuction={console.log()} titule={options[1]} width={"400px"}></Standard_button>
                <Standard_button fuction={console.log()} titule={options[2]} width={"400px"}></Standard_button>
                <Standard_button fuction={console.log()} titule={options[3]} width={"400px"}></Standard_button>
            </div>
        </div>
    );
}


export default Componente;