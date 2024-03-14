"use client";

import {button} from '@/lib/definitions';

const Standard_button: React.FC<button> =({fuction,titule,width})=>{
    return (
        <button
            className={`relative inline-flex mb-8  m-3 p-2 w-[40%] items-center justify-center dark:text-white me-2 overflow-hidden text-sm font-medium text-gray-1000 rounded-sm group bg-purple-400`}
            onClick={fuction}>
            {titule}
        </button>
    );
};

export default Standard_button;