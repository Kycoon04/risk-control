"use client";

import {button} from '@/lib/definitions';

const Standard_button: React.FC<button> =({fuction,titule})=>{
    return (
        <button
            className={`relative inline-flex mb-8 hover:bg-purple-450 m-3 p-2 w-[40%] items-center justify-center text-white me-2 overflow-hidden text-sm font-medium rounded-sm group bg-purple-400`}
            onClick={fuction}>
            {titule}
        </button>
    );
};

export default Standard_button;