"use client";
import { FaCheck } from "react-icons/fa";

interface ButtonProps {
    fuction: () => void;
    title: string;
    width: string;
    selected?: boolean;
}

const Standard_button: React.FC<ButtonProps> = ({ fuction, title, width, selected }) => {
    return (
        <button
            className={`relative inline-flex mb-8 hover:bg-purple-450 ${selected ? 'hover:bg-purple-600' : 'hover:bg-purple-450'} m-3 p-2 w-[${width}] justify-start text-white me-2 
            overflow-hidden text-sm font-light rounded-sm group ${selected ? 'bg-purple-600' : 'bg-purple-400'}`} 
            onClick={fuction}>
            {selected && <FaCheck className="text-purple-400 mr-2 text-8xl text-center" />}
            {title}
        </button>
    );
}

export default Standard_button;
