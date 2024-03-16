"use client";
import Link from 'next/link';
import { FaPen } from "react-icons/fa6";
import Standard_button from './options_Forms';
interface Field {
    titule: string;
    percent: number;
}

const Componente: React.FC = () => {
    return (
        <div className='bg-gray-1000 w-full rounded-3xl'>
            <h2 className='m-5 mb-2 font-light text-2xl'>
                Compromiso
            </h2>
            <span className='flex m-5 mt-2 font-light overflow-auto whitespace-normal text-justify'>
                El jerarca y los titulares subordinados deben apoyar constantemente el sistema de control interno y
                demostrar su compromiso con el diseño, la implantación, el fortalecimiento y la evaluación del sistema.
            </span>
            <span className='flex m-5 mt-2 font-thin overflow-auto whitespace-normal text-justify'>
                Señale la opción que describa mejor la situación actual de su entidad.
            </span>
            <div className='m-5'>
                <Standard_button fuction={console.log()} titule={"Existe un limitado compromiso por parte de algunas autoridades institucionales (jerarca y titulares subordinados) con respecto al control interno institucional.El control interno es entendido de diferentes maneras por el jerarca y los titulares subordinados.Las regulaciones sobre control interno son establecidas de manera aislada por los titulares subordinados, en relación con los asuntos que consideran sensibles."} width={"400px"}></Standard_button>
                <Standard_button fuction={console.log()} titule={"Existe un limitado compromiso por parte de algunas autoridades institucionales (jerarca y titulares subordinados) con respecto al control interno institucional.El control interno es entendido de diferentes maneras por el jerarca y los titulares subordinados.Las regulaciones sobre control interno son establecidas de manera aislada por los titulares subordinados, en relación con los asuntos que consideran sensibles."} width={"400px"}></Standard_button>
                <Standard_button fuction={console.log()} titule={"Existe un limitado compromiso por parte de algunas autoridades institucionales (jerarca y titulares subordinados) con respecto al control interno institucional.El control interno es entendido de diferentes maneras por el jerarca y los titulares subordinados.Las regulaciones sobre control interno son establecidas de manera aislada por los titulares subordinados, en relación con los asuntos que consideran sensibles."} width={"400px"}></Standard_button>
                <Standard_button fuction={console.log()} titule={"Existe un limitado compromiso por parte de algunas autoridades institucionales (jerarca y titulares subordinados) con respecto al control interno institucional.El control interno es entendido de diferentes maneras por el jerarca y los titulares subordinados.Las regulaciones sobre control interno son establecidas de manera aislada por los titulares subordinados, en relación con los asuntos que consideran sensibles."} width={"400px"}></Standard_button>
            </div>
        </div>
    );
}


export default Componente;