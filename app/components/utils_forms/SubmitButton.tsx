"use client";
import Link from 'next/link';
export interface button {
    width: string;
    titule: string;
    fuction: any;
    href:string;
}

const Standard_button: React.FC<button> = ({ fuction, titule, width,href }) => {
    return (
        <Link href={href}>
        <button
            className={`relative inline-flex mb-8 hover:bg-purple-450 m-3 p-2 w-[${width}] items-center justify-center text-white me-2 overflow-hidden text-sm font-medium rounded-sm group bg-purple-400`}
            onClick={fuction}>
            {titule}
        </button>
        </Link>
    );
};

export default Standard_button;